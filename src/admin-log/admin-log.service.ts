import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAdminLogDto } from './dto/create-admin-log.dto';
import { UpdateAdminLogDto } from './dto/update-admin-log.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminLogService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 🔹 Yangi admin log yaratish
   */
  async create(dto: CreateAdminLogDto) {
    try {
      // Admin mavjudligini tekshiramiz
      const admin = await this.prisma.user.findUnique({
        where: { id: dto.admin_id },
      });
      if (!admin) {
        throw new NotFoundException(`Admin with ID ${dto.admin_id} not found`);
      }

      const log = await this.prisma.admin_logs.create({
        data: dto,
      });

      return { message: 'Admin log created successfully', data: log };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * 🔹 Barcha admin loglarni olish
   */
  async findAll() {
    try {
      const logs = await this.prisma.admin_logs.findMany({
        include: {
          admin: true, // admin (user) ma’lumotini ham olish
        },
        orderBy: { created_at: 'desc' },
      });
      return logs;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * 🔹 Bitta logni ID bo‘yicha olish
   */
  async findOne(id: number) {
    try {
      const log = await this.prisma.admin_logs.findUnique({
        where: { id },
        include: { admin: true },
      });

      if (!log) {
        throw new NotFoundException(`Admin log with ID ${id} not found`);
      }

      return log;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * 🔹 Logni yangilash
   */
  async update(id: number, dto: UpdateAdminLogDto) {
    try {
      const existingLog = await this.prisma.admin_logs.findUnique({ where: { id } });
      if (!existingLog) {
        throw new NotFoundException(`Admin log with ID ${id} not found`);
      }

      // Agar yangi admin_id berilgan bo‘lsa — uni ham tekshiramiz
      if (dto.admin_id) {
        const admin = await this.prisma.user.findUnique({
          where: { id: dto.admin_id },
        });
        if (!admin) {
          throw new NotFoundException(`Admin with ID ${dto.admin_id} not found`);
        }
      }

      const updatedLog = await this.prisma.admin_logs.update({
        where: { id },
        data: dto,
      });

      return { message: 'Admin log updated successfully', data: updatedLog };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * 🔹 Logni o‘chirish
   */
  async remove(id: number) {
    try {
      const existingLog = await this.prisma.admin_logs.findUnique({ where: { id } });
      if (!existingLog) {
        throw new NotFoundException(`Admin log with ID ${id} not found`);
      }

      await this.prisma.admin_logs.delete({ where: { id } });
      return { message: 'Admin log deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
