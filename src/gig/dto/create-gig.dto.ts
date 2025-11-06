import { 
  IsOptional, 
  IsString, 
  IsInt, 
  IsNumber, 
  MaxLength, 
  IsPositive 
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGigDto {
  @ApiProperty({ description: 'Gig title', maxLength: 120 })
  @IsString()
  @MaxLength(120)
  title: string;

  @ApiPropertyOptional({ description: 'Gig description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Category ID of the gig', type: Number })
  @IsOptional()
  @IsInt()
  category_id?: number;

  @ApiProperty({ description: 'Basic price of the gig', type: Number })
  @IsNumber()
  @IsPositive()
  price_basic: number;

  @ApiPropertyOptional({ description: 'Standard price of the gig', type: Number })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price_standard?: number;

  @ApiPropertyOptional({ description: 'Premium price of the gig', type: Number })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price_premium?: number;

  @ApiPropertyOptional({ description: 'Delivery time in days', type: Number })
  @IsOptional()
  @IsInt()
  delivery_days?: number;

  @ApiPropertyOptional({ description: 'Number of revisions allowed', type: Number })
  @IsOptional()
  @IsInt()
  revisions?: number;

  @ApiPropertyOptional({ description: 'Thumbnail image URL' })
  @IsOptional()
  @IsString()
  thumbnail?: string;
}
