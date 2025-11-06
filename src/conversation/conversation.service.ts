import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateConversationDto) {
    try {
      return await this.prisma.conversation.create({
        data: {
          buyer_id: Number(dto.buyer_id),
          seller_id: Number(dto.seller_id),
          // DTO da endi last_message_id bor
          last_message: dto.last_message_id ? String(dto.last_message_id) : null,
        },
        include: {
          buyer: true,
          seller: true,
          messages: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Invalid foreign key: buyer_id or seller_id not found',
        );
      }
      console.error('❌ Create Conversation Error:', error);
      throw new InternalServerErrorException('Failed to create conversation');
    }
  }

  async findAll() {
    try {
      return await this.prisma.conversation.findMany({
        include: {
          buyer: true,
          seller: true,
          messages: true,
        },
        orderBy: { updated_at: 'desc' },
      });
    } catch (error) {
      console.error('❌ FindAll Conversation Error:', error);
      throw new InternalServerErrorException('Failed to fetch conversations');
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.conversation.findUnique({
        where: { id },
        include: {
          buyer: true,
          seller: true,
          messages: true,
        },
      });
      if (!data) throw new NotFoundException('Conversation not found');
      return data;
    } catch (error) {
      console.error('❌ FindOne Conversation Error:', error);
      throw new InternalServerErrorException('Failed to fetch conversation');
    }
  }

  async update(id: number, dto: UpdateConversationDto) {
    try {
      return await this.prisma.conversation.update({
        where: { id },
        data: {
          ...(dto.buyer_id && { buyer_id: Number(dto.buyer_id) }),
          ...(dto.seller_id && { seller_id: Number(dto.seller_id) }),
          ...(dto.last_message_id && {
            last_message: String(dto.last_message_id),
          }),
        },
        include: {
          buyer: true,
          seller: true,
          messages: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Conversation not found');
      }
      console.error('❌ Update Conversation Error:', error);
      throw new InternalServerErrorException('Failed to update conversation');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.conversation.delete({
        where: { id },
        include: {
          buyer: true,
          seller: true,
          messages: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Conversation not found');
      }
      console.error('❌ Delete Conversation Error:', error);
      throw new InternalServerErrorException('Failed to delete conversation');
    }
  }
}
