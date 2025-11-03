import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: 'Order ID' })
  @IsInt()
  order_id: number;

  @ApiProperty({ example: 2, description: 'Reviewer user ID (who writes the review)' })
  @IsInt()
  reviewer_id: number;

  @ApiProperty({ example: 3, description: 'Reviewee user ID (who is being reviewed)' })
  @IsInt()
  reviewee_id: number;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Excellent service and fast delivery!', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}
