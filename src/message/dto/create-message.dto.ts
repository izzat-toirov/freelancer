import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ description: 'Conversation ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  conversation_id: number;

  @ApiProperty({ description: 'Sender user ID', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  sender_id: number;

  @ApiPropertyOptional({ description: 'Message content', example: 'Salom!' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Attachment URL(s)',
    example: 'https://cdn.mysite.com/uploads/image.jpg',
  })
  @IsOptional()
  @IsString()
  attachments?: string;

  @ApiPropertyOptional({ description: 'Is message read', example: false, default: false })
  @IsOptional()
  @IsBoolean()
  is_read?: boolean;
}
