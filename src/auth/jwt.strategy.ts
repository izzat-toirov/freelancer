import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('ACCESS_TOKEN_KEY'),
    });
  }

  async validate(payload: { id: string; role: UserRole; isActive: boolean }) {
    // Prisma Int -> number sifatida qidirish
    const userId = Number(payload.id); // string -> number
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    return {
      id: user.id.toString(), // clientda string sifatida ishlatish uchun
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
