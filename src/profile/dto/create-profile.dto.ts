import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsUrl,
  IsIn,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID (user jadvalidan)' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 'Full Stack Developer', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @ApiProperty({ example: 25.5, required: false, description: 'Soatlik ish haqi (USD)' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  hourly_rate?: number;

  @ApiProperty({
    example: ['JavaScript', 'NestJS', 'PostgreSQL'],
    description: 'Foydalanuvchining ko‘nikmalari ro‘yxati',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @ApiProperty({ example: 3, required: false, description: 'Tajriba (yillarda)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  experience_years?: number;

  @ApiProperty({
    example: ['English', 'Korean'],
    description: 'Qaysi tillarni biladi',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @ApiProperty({
    example: 'https://myportfolio.com',
    required: false,
    description: 'Portfolio havolasi (ixtiyoriy maydon)',
  })
  @IsOptional()
  @IsUrl()
  portfolio_url?: string;

  @ApiProperty({
    example: 'Full-time',
    required: false,
    description: 'Ishlash holati (masalan: Full-time, Part-time, Freelance)',
  })
  @IsOptional()
  @IsString()
  @IsIn(['Full-time', 'Part-time', 'Freelance', 'Unavailable'])
  availability?: string;

  @ApiProperty({
    example: 4.5,
    required: false,
    description: 'O‘rtacha reyting (0–5)',
    default: 0.0,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  rating_avg?: number;

  @ApiProperty({
    example: 12,
    required: false,
    description: 'Jami sharhlar soni',
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  total_reviews?: number;
}
