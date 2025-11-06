import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ example: 1, description: 'User ID for the wallet' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiPropertyOptional({ example: 100.5, description: 'Initial wallet balance' })
  @IsOptional()
  @IsNumber()
  balance?: number;

  @ApiPropertyOptional({ example: 'USD', description: 'Wallet currency' })
  @IsOptional()
  @IsString()
  currency?: string;
}
