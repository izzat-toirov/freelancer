import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateDisputeDto {
  @ApiProperty({ example: '1', description: 'Order ID (BigInt as string)' })
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @ApiProperty({ example: '2', description: 'User ID who raised the dispute (BigInt as string)' })
  @IsNotEmpty()
  @IsString()
  raised_by_id: string;

  @ApiProperty({ example: 'Product not delivered properly', description: 'Reason for dispute' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ example: 'image.png', description: 'Evidence file URL or text' })
  @IsOptional()
  @IsString()
  evidence?: string;

  @ApiProperty({ example: 'pending', description: 'Status of dispute' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: 'Refund issued', description: 'Resolution or admin decision' })
  @IsOptional()
  @IsString()
  resolution?: string;
}
