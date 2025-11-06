import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { DisputeStatus } from '@prisma/client';

@Injectable()
export class DisputeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDisputeDto) {
    try {
      const orderId = Number(dto.order_id);
      const raisedById = Number(dto.raised_by_id);

      const order = await this.prisma.orders.findUnique({ where: { id: orderId } });
      if (!order) throw new NotFoundException('Order not found');

      const user = await this.prisma.user.findUnique({ where: { id: raisedById } });
      if (!user) throw new NotFoundException('User not found');

      return await this.prisma.dispute.create({
        data: {
          order_id: orderId,
          raised_by: raisedById,
          reason: dto.reason,
          evidence: dto.evidence || [],
          status: dto.status ?? DisputeStatus.RESOLVED,
          resolution: dto.resolution,
        },
        include: {
          order: true,
          raiser: true,
        },
      });
    } catch (error: any) {
      console.error('❌ Create Dispute Error:', error);
      if (error.code === 'P2003') throw new BadRequestException('Invalid foreign key');
      throw new InternalServerErrorException('Failed to create dispute');
    }
  }

  async findAll() {
    try {
      return await this.prisma.dispute.findMany({
        include: {
          order: true,
          raiser: true,
        },
        orderBy: { created_at: 'desc' },
      });
    } catch (error) {
      console.error('❌ FindAll Dispute Error:', error);
      throw new InternalServerErrorException('Failed to fetch disputes');
    }
  }

  async findOne(id: number) {
    try {
      const dispute = await this.prisma.dispute.findUnique({
        where: { id },
        include: {
          order: true,
          raiser: true,
        },
      });
      if (!dispute) throw new NotFoundException('Dispute not found');
      return dispute;
    } catch (error) {
      console.error('❌ FindOne Dispute Error:', error);
      throw new InternalServerErrorException('Failed to fetch dispute');
    }
  }

  async update(id: number, dto: UpdateDisputeDto) {
    try {
      return await this.prisma.dispute.update({
        where: { id },
        data: {
          order_id: dto.order_id ? Number(dto.order_id) : undefined,
          raised_by: dto.raised_by_id ? Number(dto.raised_by_id) : undefined,
          reason: dto.reason,
          evidence: dto.evidence || undefined,
          status: dto.status,
          resolution: dto.resolution,
        },
        include: {
          order: true,
          raiser: true,
        },
      });
    } catch (error: any) {
      console.error('❌ Update Dispute Error:', error);
      if (error.code === 'P2025') throw new NotFoundException('Dispute not found');
      throw new InternalServerErrorException('Failed to update dispute');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.dispute.delete({ where: { id } });
    } catch (error: any) {
      console.error('❌ Delete Dispute Error:', error);
      if (error.code === 'P2025') throw new NotFoundException('Dispute not found');
      throw new InternalServerErrorException('Failed to delete dispute');
    }
  }
}
