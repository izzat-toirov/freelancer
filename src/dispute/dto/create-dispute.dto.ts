import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsArray, IsEnum } from 'class-validator';
import { DisputeStatus } from '@prisma/client';

export class CreateDisputeDto {
  @ApiProperty({ example: '1', description: 'Order ID' })
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @ApiProperty({ example: '2', description: 'User ID who raised the dispute' })
  @IsNotEmpty()
  @IsString()
  raised_by_id: string;

  @ApiProperty({ example: 'Product not delivered properly', description: 'Reason' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ example: ['image.png'], description: 'Evidence as array of strings' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  evidence?: string[];

  @ApiProperty({ example: DisputeStatus.OPEN, enum: DisputeStatus, description: 'Status' })
  @IsOptional()
  @IsEnum(DisputeStatus)
  status?: DisputeStatus;

  @ApiProperty({ example: 'Refund issued', description: 'Resolution' })
  @IsOptional()
  @IsString()
  resolution?: string;
}
