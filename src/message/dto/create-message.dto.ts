import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Xabar tegishli bo‘lgan suhbat (conversation) IDsi',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  conversation_id: number;

  @ApiProperty({
    description: 'Xabar yuborgan foydalanuvchi (user) IDsi',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  sender_id: number;

  @ApiPropertyOptional({
    description: 'Xabar matni (agar mavjud bo‘lsa)',
    example: 'Salom, qanday siz?',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Biriktirilgan fayl(lar) URL manzili (masalan: rasm, hujjat)',
    example: 'https://cdn.mysite.com/uploads/image.jpg',
  })
  @IsOptional()
  @IsString()
  attachments?: string;

  @ApiPropertyOptional({
    description: 'Xabar o‘qilgan yoki yo‘qligini bildiradi',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_read?: boolean;
}
