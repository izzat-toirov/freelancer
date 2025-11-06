import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReviewDto) {
    try {
      const order = await this.prisma.orders.findUnique({
        where: { id: Number(dto.order_id) },
      });
      const reviewer = await this.prisma.user.findUnique({
        where: { id: Number(dto.reviewer_id) },
      });
      const reviewee = await this.prisma.user.findUnique({
        where: { id: Number(dto.reviewee_id) },
      });

      if (!order) throw new BadRequestException('Order not found');
      if (!reviewer) throw new BadRequestException('Reviewer not found');
      if (!reviewee) throw new BadRequestException('Reviewee not found');

      return await this.prisma.review.create({
        data: {
          order_id: dto.order_id ? Number(dto.order_id) : null,
          reviewer_id: Number(dto.reviewer_id),
          reviewee_id: Number(dto.reviewee_id),
          rating: dto.rating,
          comment: dto.comment,
        },
        include: {
          reviewer: true,
          reviewee: true,
          order: true,
        },
      });
    } catch (error) {
      console.error('❌ Create Review Error:', error);
      throw new InternalServerErrorException('Failed to create review');
    }
  }

  async findAll() {
    try {
      return await this.prisma.review.findMany({
        include: {
          reviewer: true,
          reviewee: true,
          order: true,
        },
        orderBy: { created_at: 'desc' },
      });
    } catch (error) {
      console.error('❌ Find All Reviews Error:', error);
      throw new InternalServerErrorException('Failed to fetch reviews');
    }
  }

  async findOne(id: number) {
    try {
      const review = await this.prisma.review.findUnique({
        where: { id: Number(id) },
        include: {
          reviewer: true,
          reviewee: true,
          order: true,
        },
      });

      if (!review)
        throw new NotFoundException(`Review with ID ${id} not found`);

      return review;
    } catch (error) {
      console.error('❌ Find Review Error:', error);
      throw new InternalServerErrorException('Failed to fetch review');
    }
  }

  async update(id: number, dto: UpdateReviewDto) {
    try {
      const existingReview = await this.prisma.review.findUnique({
        where: { id: Number(id) },
      });
      if (!existingReview)
        throw new NotFoundException(`Review with ID ${id} not found`);

      if (dto.order_id) {
        const order = await this.prisma.orders.findUnique({
          where: { id: Number(dto.order_id) },
        });
        if (!order) throw new BadRequestException('Order not found');
      }
      if (dto.reviewer_id) {
        const reviewer = await this.prisma.user.findUnique({
          where: { id: Number(dto.reviewer_id) },
        });
        if (!reviewer) throw new BadRequestException('Reviewer not found');
      }
      if (dto.reviewee_id) {
        const reviewee = await this.prisma.user.findUnique({
          where: { id: Number(dto.reviewee_id) },
        });
        if (!reviewee) throw new BadRequestException('Reviewee not found');
      }

      return await this.prisma.review.update({
        where: { id: Number(id) },
        data: {
          ...(dto.order_id && { order_id: Number(dto.order_id) }),
          ...(dto.reviewer_id && { reviewer_id: Number(dto.reviewer_id) }),
          ...(dto.reviewee_id && { reviewee_id: Number(dto.reviewee_id) }),
          ...(dto.rating !== undefined && { rating: dto.rating }),
          ...(dto.comment && { comment: dto.comment }),
        },
        include: {
          reviewer: true,
          reviewee: true,
          order: true,
        },
      });
    } catch (error) {
      console.error('❌ Update Review Error:', error);
      throw new InternalServerErrorException('Failed to update review');
    }
  }

  async remove(id: number) {
    try {
      const review = await this.prisma.review.findUnique({
        where: { id: Number(id) },
      });
      if (!review)
        throw new NotFoundException(`Review with ID ${id} not found`);

      return await this.prisma.review.delete({
        where: { id: Number(id) },
        include: {
          reviewer: true,
          reviewee: true,
          order: true,
        },
      });
    } catch (error) {
      console.error('❌ Delete Review Error:', error);
      throw new InternalServerErrorException('Failed to delete review');
    }
  }
}
