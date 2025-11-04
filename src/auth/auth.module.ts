import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MailService } from '../mail/mail.service';
import { PrismaModule } from '../prisma/prisma.module'; // ✅ import qilindi

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, // ✅ qo‘shildi
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const secret = config.get<string>('ACCESS_TOKEN_KEY');
        const expiresIn = config.get<string>('ACCESS_TOKEN_TIME') || '1800s';
        if (!secret) throw new Error('ACCESS_TOKEN_KEY is not defined in .env');
        return { secret, signOptions: { expiresIn: expiresIn as any } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
