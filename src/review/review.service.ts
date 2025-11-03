import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReviewDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: BigInt(dto.order_id) },
    });
    const reviewer = await this.prisma.user.findUnique({
      where: { id: BigInt(dto.reviewer_id) },
    });
    const reviewee = await this.prisma.user.findUnique({
      where: { id: BigInt(dto.reviewee_id) },
    });

    if (!order) throw new BadRequestException('Order not found');
    if (!reviewer) throw new BadRequestException('Reviewer not found');
    if (!reviewee) throw new BadRequestException('Reviewee not found');

    return this.prisma.review.create({
      data: {
        order_id: BigInt(dto.order_id),
        reviewer_id: BigInt(dto.reviewer_id),
        reviewee_id: BigInt(dto.reviewee_id),
        rating: dto.rating,
        comment: dto.comment,
      },
      include: {
        reviewer: true,
        reviewee: true,
        order: true,
      },
    });
  }

  async findAll() {
    return this.prisma.review.findMany({
      include: {
        reviewer: true,
        reviewee: true,
        order: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: bigint) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        reviewer: true,
        reviewee: true,
        order: true,
      },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: bigint, dto: UpdateReviewDto) {
    const existingReview = await this.prisma.review.findUnique({
      where: { id },
    });
    if (!existingReview)
      throw new NotFoundException(`Review with ID ${id} not found`);

    if (dto.order_id) {
      const order = await this.prisma.order.findUnique({
        where: { id: BigInt(dto.order_id) },
      });
      if (!order) throw new BadRequestException('Order not found');
    }
    if (dto.reviewer_id) {
      const reviewer = await this.prisma.user.findUnique({
        where: { id: BigInt(dto.reviewer_id) },
      });
      if (!reviewer) throw new BadRequestException('Reviewer not found');
    }
    if (dto.reviewee_id) {
      const reviewee = await this.prisma.user.findUnique({
        where: { id: BigInt(dto.reviewee_id) },
      });
      if (!reviewee) throw new BadRequestException('Reviewee not found');
    }

    return this.prisma.review.update({
      where: { id },
      data: {
        ...(dto.order_id && { order_id: BigInt(dto.order_id) }),
        ...(dto.reviewer_id && { reviewer_id: BigInt(dto.reviewer_id) }),
        ...(dto.reviewee_id && { reviewee_id: BigInt(dto.reviewee_id) }),
        ...(dto.rating !== undefined && { rating: dto.rating }),
        ...(dto.comment && { comment: dto.comment }),
      },
      include: {
        reviewer: true,
        reviewee: true,
        order: true,
      },
    });
  }

  async remove(id: bigint) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review)
      throw new NotFoundException(`Review with ID ${id} not found`);

    return this.prisma.review.delete({
      where: { id },
      include: {
        reviewer: true,
        reviewee: true,
        order: true,
      },
    });
  }
}
