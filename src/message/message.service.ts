import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMessageDto) {
    const conversationId = BigInt(dto.conversation_id);
    const senderId = BigInt(dto.sender_id);

    // 🔹 Conversation mavjudligini tekshirish
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conversation) throw new NotFoundException('Conversation not found');

    // 🔹 Sender mavjudligini tekshirish
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
    });
    if (!sender) throw new NotFoundException('Sender (user) not found');

    // 🔹 Yangi message yaratish
    return this.prisma.message.create({
      data: {
        conversation_id: conversationId,
        sender_id: senderId,
        content: dto.content,
        attachments: dto.attachments,
        is_read: dto.is_read ?? false,
      },
      include: { sender: true, conversation: true },
    });
  }

  async findAll() {
    return this.prisma.message.findMany({
      include: { sender: true, conversation: true },
      orderBy: { sent_at: 'desc' },
    });
  }

  async findOne(id: bigint) {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: { sender: true, conversation: true },
    });
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  async update(id: bigint, dto: UpdateMessageDto) {
    const exists = await this.prisma.message.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Message not found');

    return this.prisma.message.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: bigint) {
    const exists = await this.prisma.message.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Message not found');

    return this.prisma.message.delete({
      where: { id },
    });
  }
}
