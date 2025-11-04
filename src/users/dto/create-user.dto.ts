import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { UserRole, UserStatus } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'To‘liq ism' })
  @IsString()
  @MaxLength(255)
  full_name: string;

  @ApiProperty({ example: 'johndoe', description: 'Foydalanuvchi nomi (unikal)' })
  @IsString()
  @MaxLength(255)
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email manzil (unikal)' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Parol' })
  @IsString()
  @MaxLength(255)
  password: string;

  @ApiPropertyOptional({
    enum: UserRole,
    example: UserRole.CLIENT,
    description: 'Foydalanuvchi roli (CLIENT, FREELANCER, ADMIN, SUPER_ADMIN)',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg', description: 'Avatar URL' })
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

  @ApiPropertyOptional({
    enum: UserStatus,
    example: UserStatus.PENDING,
    description: 'Foydalanuvchi holati (PENDING, ACTIVE, BLOCKED)',
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({ example: true, description: 'Foydalanuvchi aktiv holatda yoki yo‘q' })
  @IsOptional()
  isActive?: boolean;
}
