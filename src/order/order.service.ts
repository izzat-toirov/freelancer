import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto, role: UserRole) {
    try {
      if (role !== UserRole.CLIENT)
        throw new BadRequestException('Only clients can create orders');

      const order = await this.prisma.orders.create({ data: dto });
      return { message: 'Order created successfully', order };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: QueryOrdersDto) {
    try {
      const { search, page = 1, limit = 10 } = query;

      const where: any = {};

      if (search) {
        where.OR = [
          {
            buyer: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
          {
            seller: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ];
      }

      const orders = await this.prisma.orders.findMany({
        where,
        include: { buyer: true, seller: true, gig: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      });

      const total = await this.prisma.orders.count({ where });

      return { total, page, limit, orders };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.prisma.orders.findUnique({
        where: { id },
        include: { buyer: true, seller: true, gig: true },
      });

      if (!order) throw new NotFoundException('Order not found');
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, dto: UpdateOrderDto, role: UserRole) {
    try {
      const existing = await this.prisma.orders.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException('Order not found');

      if (role !== UserRole.ADMIN && role !== UserRole.SUPER_ADMIN)
        throw new BadRequestException(
          'You are not allowed to update this order',
        );

      const updated = await this.prisma.orders.update({
        where: { id },
        data: dto,
      });
      return { message: 'Order updated successfully', updated };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number, role: UserRole) {
    try {
      const existing = await this.prisma.orders.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException('Order not found');

      if (role !== UserRole.ADMIN && role !== UserRole.SUPER_ADMIN)
        throw new BadRequestException(
          'You are not allowed to delete this order',
        );

      await this.prisma.orders.delete({ where: { id } });
      return { message: 'Order deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
