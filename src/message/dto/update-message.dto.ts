import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @ApiPropertyOptional({
    description: 'Yangilanish uchun conversation_id (ixtiyoriy)',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  conversation_id?: number;

  @ApiPropertyOptional({
    description: 'Yangilanish uchun sender_id (ixtiyoriy)',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  sender_id?: number;

  @ApiPropertyOptional({
    description: 'Yangilangan xabar matni',
    example: 'Salom, endi bandman, keyin yozaman.',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Yangilangan attachment URL (ixtiyoriy)',
    example: 'https://cdn.mysite.com/uploads/newfile.pdf',
  })
  @IsOptional()
  @IsString()
  attachments?: string;

  @ApiPropertyOptional({
    description: 'Xabar o‘qilgan yoki yo‘qligini yangilash',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_read?: boolean;
}
