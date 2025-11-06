import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Order ID', required: false })
  @IsOptional()
  @IsInt()
  order_id?: number;

  @ApiProperty({ description: 'Buyer ID', required: false })
  @IsOptional()
  @IsInt()
  buyer_id?: number;

  @ApiProperty({ description: 'Payment amount' })
  @IsDecimal()
  amount: number;

  @ApiProperty({ enum: PaymentMethod, description: 'Payment method' })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({ description: 'Transaction ID', required: false })
  @IsOptional()
  @IsString()
  transaction_id?: string;

  @ApiProperty({ enum: PaymentStatus, description: 'Payment status', required: false })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}
