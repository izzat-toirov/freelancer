import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';

@Injectable()
export class DisputeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDisputeDto) {
    const orderId = BigInt(dto.order_id);
    const raisedById = BigInt(dto.raised_by_id);

    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    const user = await this.prisma.user.findUnique({ where: { id: raisedById } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.dispute.create({
      data: {
        order_id: orderId,
        raised_by_id: raisedById,
        reason: dto.reason,
        evidence: dto.evidence,
        status: dto.status ?? 'pending',
        resolution: dto.resolution,
      },
      include: {
        order: true,
        raised_by: true,
      },
    });
  }

  async findAll() {
    return this.prisma.dispute.findMany({
      include: {
        order: true,
        raised_by: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: bigint) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id },
      include: {
        order: true,
        raised_by: true,
      },
    });
    if (!dispute) throw new NotFoundException('Dispute not found');
    return dispute;
  }

async update(id: bigint, dto: UpdateDisputeDto) {
  const dispute = await this.prisma.dispute.findUnique({ where: { id } });
  if (!dispute) throw new NotFoundException('Dispute not found');

  return this.prisma.dispute.update({
    where: { id },
    data: {
      order_id: dto.order_id ? BigInt(dto.order_id) : undefined,
      raised_by_id: dto.raised_by_id ? BigInt(dto.raised_by_id) : undefined,
      reason: dto.reason,
      evidence: dto.evidence,
      status: dto.status,
      resolution: dto.resolution,
    },
  });
}


  async remove(id: bigint) {
    const dispute = await this.prisma.dispute.findUnique({ where: { id } });
    if (!dispute) throw new NotFoundException('Dispute not found');

    return this.prisma.dispute.delete({
      where: { id },
    });
  }
}
