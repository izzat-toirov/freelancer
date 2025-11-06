import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsEnum, IsDecimal, IsDateString } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: 'Buyurtma berayotgan foydalanuvchining ID raqami (CLIENT)',
  })
  @IsInt()
  buyer_id: number;

  @ApiProperty({
    example: 2,
    description: 'Xizmatni bajaruvchi (freelancer) foydalanuvchining ID raqami',
  })
  @IsInt()
  seller_id: number;

  @ApiPropertyOptional({
    example: 5,
    description: 'Bog‘liq gig (xizmat) ID raqami. Agar mavjud bo‘lmasa optional.',
  })
  @IsOptional()
  @IsInt()
  gig_id?: number;

  @ApiPropertyOptional({
    enum: OrderStatus,
    example: OrderStatus.PENDING,
    description: 'Buyurtma holati: PENDING, IN_PROGRESS, COMPLETED, CANCELED va hokazo',
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({
    example: '49.99',
    description: 'Buyurtma narxi (Decimal formatda)',
  })
  @IsDecimal()
  amount: any;

  @ApiPropertyOptional({
    example: '2025-11-30T00:00:00Z',
    description: 'Xizmatni yetkazib berish muddati (ISO8601 formatda)',
  })
  @IsOptional()
  @IsDateString()
  delivery_date?: string;
}
