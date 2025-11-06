import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMessageDto) {
    try {
      const conversationId = Number(dto.conversation_id);
      const senderId = Number(dto.sender_id);

      const conversation = await this.prisma.conversation.findUnique({
        where: { id: conversationId },
      });
      if (!conversation) throw new NotFoundException('Conversation not found');

      const sender = await this.prisma.user.findUnique({
        where: { id: senderId },
      });
      if (!sender) throw new NotFoundException('Sender (user) not found');

      return await this.prisma.message.create({
        data: {
          conversation_id: conversationId,
          sender_id: senderId,
          content: dto.content,
          attachments: dto.attachments ? [dto.attachments] : [],
          is_read: dto.is_read ?? false,
        },
        include: { sender: true, conversation: true },
      });
    } catch (error) {
      console.error('❌ Create Message Error:', error);
      throw new InternalServerErrorException('Failed to create message');
    }
  }

  async findAll() {
    try {
      return await this.prisma.message.findMany({
        include: { sender: true, conversation: true },
        orderBy: { sent_at: 'desc' },
      });
    } catch (error) {
      console.error('❌ FindAll Message Error:', error);
      throw new InternalServerErrorException('Failed to fetch messages');
    }
  }

  async findOne(id: number) {
    try {
      const message = await this.prisma.message.findUnique({
        where: { id },
        include: { sender: true, conversation: true },
      });
      if (!message) throw new NotFoundException('Message not found');
      return message;
    } catch (error) {
      console.error('❌ FindOne Message Error:', error);
      throw new InternalServerErrorException('Failed to fetch message');
    }
  }

  async update(id: number, dto: UpdateMessageDto) {
    try {
      const exists = await this.prisma.message.findUnique({ where: { id } });
      if (!exists) throw new NotFoundException('Message not found');

      return await this.prisma.message.update({
        where: { id },
        data: {
          content: dto.content,
          attachments: dto.attachments ? [dto.attachments] : undefined,
          is_read: dto.is_read,
        },
      });
    } catch (error) {
      console.error('❌ Update Message Error:', error);
      throw new InternalServerErrorException('Failed to update message');
    }
  }

  async remove(id: number) {
    try {
      const exists = await this.prisma.message.findUnique({ where: { id } });
      if (!exists) throw new NotFoundException('Message not found');

      return await this.prisma.message.delete({ where: { id } });
    } catch (error) {
      console.error('❌ Delete Message Error:', error);
      throw new InternalServerErrorException('Failed to delete message');
    }
  }
}
