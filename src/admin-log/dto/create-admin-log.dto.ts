import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAdminLogDto {
  @ApiProperty({
    example: 1,
    description: 'Admin foydalanuvchi ID (user jadvalidan foreign key)',
  })
  @IsInt()
  admin_id: number;

  @ApiProperty({
    example: 'User deleted',
    description: 'Admin tomonidan bajarilgan harakat tavsifi (masalan: User deleted, Profile updated)',
  })
  @IsString()
  @MaxLength(100)
  action: string;

  @ApiPropertyOptional({
    example: 42,
    description: 'Tegishli obyekt (target) ID — masalan, foydalanuvchi yoki profil ID',
  })
  @IsOptional()
  @IsInt()
  target_id?: number;

  @ApiPropertyOptional({
    example: 'user',
    description: 'Tegishli obyekt turi (masalan: user, profile, payment)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  target_type?: string;
}
