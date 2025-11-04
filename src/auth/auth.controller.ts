import { Controller, Post, Body, Res, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthYr } from './dto/register-auth-yr.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import type { Response } from 'express';
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { GetUser } from './decorators/get-user.decorator';
import { user } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // -------------------- OTP --------------------
  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP to email' })
  @ApiBody({ type: SendOtpDto })
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiBody({ type: VerifyOtpDto })
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  // -------------------- REGISTER --------------------
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterAuthYr })
  register(@Body() data: RegisterAuthYr) {
    return this.authService.register(data);
  }

  // -------------------- LOGIN --------------------
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginAuthDto })
  login(@Body() loginDto: LoginAuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  // -------------------- LOGOUT --------------------
  // @Post('logout')
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Logout user' })
  // logout(@GetUser() user: User, @Res({ passthrough: true }) res: Response) {
  //   return this.authService.logout(user.id, res);
  // }

  // -------------------- PROFILE / ME --------------------
  // @Get('me')
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Get user profile' })
  // getProfile(@GetUser() user: User) {
  //   return this.authService.getProfile(user.id);
  // }
}
