import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty({ example: 1, description: 'Buyer ID' })
  @IsNotEmpty()
  @IsNumber()
  buyer_id: number;

  @ApiProperty({ example: 2, description: 'Seller ID' })
  @IsNotEmpty()
  @IsNumber()
  seller_id: number;

  @ApiProperty({ example: 5, description: 'Last message ID', required: false })
  @IsOptional()
  @IsNumber()
  last_message_id?: number;
}
