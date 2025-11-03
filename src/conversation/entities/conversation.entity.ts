import { ApiProperty } from '@nestjs/swagger';

export class Conversation {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  buyer_id: number;

  @ApiProperty({ example: 2 })
  seller_id: number;

  @ApiProperty({ type: [Object], required: false })
  messages?: any[];

  @ApiProperty({ example: null, required: false })
  last_message_id?: number | null;

  @ApiProperty({ type: Object, required: false })
  last_message?: any | null;

  @ApiProperty({ type: 'string', format: 'date-time' })
  created_at: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updated_at: Date;
}
