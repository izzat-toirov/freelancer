import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Yangi profil yaratish
   */
  async create(dto: CreateProfileDto) {
    try {
      // Avval user mavjudligini tekshiramiz
      const user = await this.prisma.user.findUnique({
        where: { id: dto.user_id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${dto.user_id} not found`);
      }

      // Profil yaratiladi
      const profile = await this.prisma.profile.create({
        data: dto,
      });
      return { message: 'Profile created successfully', data: profile };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('This user already has a profile');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Barcha profillarni olish
   */
  async findAll() {
    try {
      return await this.prisma.profile.findMany({
        include: { user: true },
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Bitta profilni ID bo‘yicha olish
   */
  async findOne(id: number) {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { id },
        include: { user: true },
      });
      if (!profile) throw new NotFoundException(`Profile with ID ${id} not found`);
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Profilni yangilash
   */
  async update(id: number, dto: UpdateProfileDto) {
    try {
      const existingProfile = await this.prisma.profile.findUnique({ where: { id } });
      if (!existingProfile) {
        throw new NotFoundException(`Profile with ID ${id} not found`);
      }

      // Agar user_id berilgan bo‘lsa, uni ham tekshiramiz
      if (dto.user_id) {
        const user = await this.prisma.user.findUnique({ where: { id: dto.user_id } });
        if (!user) throw new NotFoundException(`User with ID ${dto.user_id} not found`);
      }

      const updated = await this.prisma.profile.update({
        where: { id },
        data: dto,
      });
      return { message: 'Profile updated successfully', data: updated };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Profilni o‘chirish
   */
  async remove(id: number) {
    try {
      const existing = await this.prisma.profile.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`Profile with ID ${id} not found`);

      await this.prisma.profile.delete({ where: { id } });
      return { message: 'Profile deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
