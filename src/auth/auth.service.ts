import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { totp } from 'otplib';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { RegisterAuthYr } from './dto/register-auth-yr.dto';
import { RegisterAuthFz } from './dto/register-auth.fz.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';

totp.options = { step: 300 }; // OTP 5 daqiqa

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly jwt: JwtService,
  ) {}

  // -------------------- OTP --------------------
  async sendOtp(sendOtpDto: SendOtpDto) {
    try {
      const otp = totp.generate(sendOtpDto.email + 'secret-key');
      await this.mail.sendSmsToMail(
        sendOtpDto.email,
        'Verification code',
        'Your OTP code:',
        `<div style="text-align: center; font-size: 30px; margin-top: 20px">${otp}</div>`
      );
      return { message: 'OTP sent successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Internal server error');
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    try {
      const isValid = totp.verify({
        token: verifyOtpDto.otp,
        secret: verifyOtpDto.email + 'secret-key',
      });

      if (!isValid) return { valid: false, message: 'Invalid or expired OTP' };

      await this.prisma.user.update({
        where: { email: verifyOtpDto.email },
        data: { isActive: true },
      });

      return { valid: true, message: 'Email verified successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Internal server error');
    }
  }

  // -------------------- REGISTER --------------------
  async register(data: RegisterAuthYr | RegisterAuthFz) {
    try {
      const existingEmail = await this.prisma.user.findFirst({ where: { email: data.email } });
      if (existingEmail) throw new BadRequestException('User with this email already exists');

      const existingUsername = await this.prisma.user.findFirst({ where: { username: (data as any).username } });
      if (existingUsername) throw new BadRequestException('Username already taken');

      const hashedPassword = bcrypt.hashSync(data.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          full_name: data.fullname,
          username: (data as any).username,
          email: data.email,
          password: hashedPassword,
          avatar_url: (data as any).avatar_url || null,
          bio: (data as any).bio || null,
          country: (data as any).country || null,
          isActive: false,
        },
      });

      return {
        message: 'User registered successfully',
        data: {
          id: newUser.id.toString(),
          full_name: newUser.full_name,
          email: newUser.email,
          username: newUser.username,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Internal server error');
    }
  }

  // -------------------- LOGIN --------------------
  async login(loginDto: LoginAuthDto, res: Response) {
    const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    if (!user.isActive) throw new BadRequestException('Please verify your email before login');

    const refreshToken = uuidv4();
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { hashedRefreshToken },
    });

    const accessToken = this.jwt.sign(
      { id: user.id.toString(), email: user.email, username: user.username },
      { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '30m' }
    );

    // Refresh tokenni cookiega saqlash
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kun
    });

    return {
      message: 'Login successful',
      data: {
        access_token: accessToken,
        user: {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
        },
      },
    };
  }

  // Logout
async logout(userId: number | bigint, res: Response) {
  const id =
    typeof userId === 'bigint' ? Number(userId) : userId;

  await this.prisma.user.update({
    where: { id },
    data: { hashedRefreshToken: null },
  });

  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return { message: 'Logged out successfully' };
}

// GetProfile
async getProfile(userId: number | bigint) {
  const id =
    typeof userId === 'bigint' ? Number(userId) : userId;

  const user = await this.prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      full_name: true,
      username: true,
      email: true,
      bio: true,
      avatar_url: true,
      country: true,
      isActive: true,
    },
  });

  if (!user) throw new BadRequestException('User not found');

  return {
    message: 'Profile fetched successfully',
    data: {
      ...user,
      id: user.id.toString(),
    },
  };
}

}
