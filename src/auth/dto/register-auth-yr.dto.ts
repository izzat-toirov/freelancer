// register-auth-yr.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class RegisterAuthYr {
  @ApiProperty({ example: 'Ali', description: 'Foydalanuvchi to‘liq ismi' })
  @IsString()
  @MaxLength(255)
  fullname: string;

  @ApiProperty({ example: 'ali123', description: 'Foydalanuvchi nomi (unikal)' })
  @IsString()
  @MaxLength(255)
  username: string;

  @ApiProperty({ example: 'ali@gmail.com', description: 'Email manzil' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: 'parol123',
    description: 'Parol (kamida 6 ta belgidan iborat)',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg', description: 'Avatar URL manzili' })
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @ApiPropertyOptional({ example: 'Frontend dasturchi, 3 yillik tajriba', description: 'Bio yoki qisqa tavsif' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 'Uzbekistan', description: 'Mamlakat nomi' })
  @IsOptional()
  @IsString()
  country?: string;
}
