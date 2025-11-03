import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // 🟢 CREATE
  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: 'Review successfully created' })
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  // 🟡 FIND ALL
  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'List of all reviews' })
  async findAll() {
    return this.reviewService.findAll();
  }

  // 🔵 FIND ONE
  @Get(':id')
  @ApiOperation({ summary: 'Get review by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Review ID' })
  @ApiResponse({ status: 200, description: 'Single review data' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOne(BigInt(id));
  }

  // 🟠 UPDATE
  @Patch(':id')
  @ApiOperation({ summary: 'Update review by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({ status: 200, description: 'Review successfully updated' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewService.update(BigInt(id), dto);
  }

  // 🔴 DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Delete review by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Review successfully deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.remove(BigInt(id));
  }
}
