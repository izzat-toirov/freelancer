import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsBoolean, IsEnum, MaxLength } from 'class-validator';
import { NotificationType } from '@prisma/client';

export class CreateNotificationDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID (user jadvalidan)' })
  @IsInt()
  user_id: number;

  @ApiPropertyOptional({ example: 'Order Update', description: 'Bildirishnoma sarlavhasi' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @ApiPropertyOptional({ example: 'Your order has been shipped', description: 'Bildirishnoma matni' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ example: 'ORDER', enum: NotificationType, description: 'Bildirishnoma turi' })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiPropertyOptional({ example: false, description: 'O‘qilgan yoki o‘qilmaganligini bildiradi' })
  @IsOptional()
  @IsBoolean()
  is_read?: boolean;
}
