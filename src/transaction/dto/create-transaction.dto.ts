import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: 1, description: 'Wallet ID (foreign key)' })
  @IsNotEmpty()
  @IsNumber()
  wallet_id: number;

  @ApiProperty({ example: 'deposit', description: 'Transaction type (deposit, withdrawal, transfer, etc.)' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ example: 1500.50, description: 'Transaction amount' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'INV-2025-01', description: 'Optional transaction reference', required: false })
  @IsOptional()
  @IsString()
  reference?: string;
}
