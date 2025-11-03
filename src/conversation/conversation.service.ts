import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateConversationDto) {
    try {
      return await this.prisma.conversation.create({ data: dto });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Invalid foreign key: buyer_id or seller_id not found');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.conversation.findMany({
      include: {
        buyer: true,
        seller: true,
        last_message: true,
        messages: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: bigint) {
    const data = await this.prisma.conversation.findUnique({
      where: { id },
      include: {
        buyer: true,
        seller: true,
        last_message: true,
        messages: true,
      },
    });
    if (!data) throw new NotFoundException('Conversation not found');
    return data;
  }

  async update(id: bigint, dto: UpdateConversationDto) {
    try {
      return await this.prisma.conversation.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Conversation not found');
      }
      throw error;
    }
  }

  async remove(id: bigint) {
    try {
      return await this.prisma.conversation.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Conversation not found');
      }
      throw error;
    }
  }
}
