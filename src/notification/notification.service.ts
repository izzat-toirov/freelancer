import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 🔹 Yangi bildirishnoma yaratish
   */
  async create(dto: CreateNotificationDto) {
    try {
      // user mavjudligini tekshirish
      const user = await this.prisma.user.findUnique({ where: { id: dto.user_id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${dto.user_id} not found`);
      }

      const notification = await this.prisma.notification.create({
        data: dto,
      });

      return { message: 'Notification created successfully', data: notification };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * 🔹 Barcha bildirishnomalarni olish
   */
  async findAll() {
    try {
      const notifications = await this.prisma.notification.findMany({
        include: { user: true },
        orderBy: { created_at: 'desc' },
      });
      return notifications;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * 🔹 Bitta bildirishnomani ID bo‘yicha olish
   */
  async findOne(id: number) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id },
        include: { user: true },
      });

      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }

      return notification;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * 🔹 Bildirishnomani yangilash
   */
  async update(id: number, dto: UpdateNotificationDto) {
    try {
      const existingNotification = await this.prisma.notification.findUnique({ where: { id } });
      if (!existingNotification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }

      // Agar user_id o‘zgartirilgan bo‘lsa, yangi user mavjudligini tekshirish
      if (dto.user_id) {
        const user = await this.prisma.user.findUnique({ where: { id: dto.user_id } });
        if (!user) {
          throw new NotFoundException(`User with ID ${dto.user_id} not found`);
        }
      }

      const updatedNotification = await this.prisma.notification.update({
        where: { id },
        data: dto,
      });

      return { message: 'Notification updated successfully', data: updatedNotification };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * 🔹 Bildirishnomani o‘chirish
   */
  async remove(id: number) {
    try {
      const existingNotification = await this.prisma.notification.findUnique({ where: { id } });
      if (!existingNotification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }

      await this.prisma.notification.delete({ where: { id } });
      return { message: 'Notification deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
