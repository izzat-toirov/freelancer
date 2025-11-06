import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole, UserStatus } from '@prisma/client';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** 🧩 Modul ishga tushganda Super Admin yaratish */
  async onModuleInit() {
    await this.createSuperAdmin();
  }

  /** Superadmin faqat modul ishga tushganda yaratiladi */
  private async createSuperAdmin() {
    try {
      const superAdminEmail = 'superadmin@gmail.com';
      const superAdminUsername = 'superadmin';

      const existingAdmin = await this.prisma.user.findFirst({
        where: { email: superAdminEmail, role: UserRole.SUPER_ADMIN },
      });

      if (existingAdmin) {
        this.logger.log('ℹ️ Superadmin allaqachon mavjud.');
        return;
      }

      const hashedPassword = await bcrypt.hash('SuperAdmin123!', 10);

      await this.prisma.user.create({
        data: {
          full_name: 'Super Admin',
          username: superAdminUsername,
          email: superAdminEmail,
          password: hashedPassword,
          role: UserRole.SUPER_ADMIN,
          country: 'Uzbekistan',
          isActive: true,
          status: UserStatus.ACTIVE,
        },
      });

      this.logger.log('✅ Superadmin muvaffaqiyatli yaratildi.');
    } catch (error) {
      this.logger.error('❌ Superadmin yaratishda xatolik:', error);
    }
  }

  /** 👤 Yangi foydalanuvchi yaratish */
  async create(createUserDto: CreateUserDto) {
    try {
      const { email, username, password, role } = createUserDto;

      // ❌ SUPER_ADMIN yaratish taqiqlanadi
      if (role === UserRole.SUPER_ADMIN) {
        return { message: '🚫 Super Admin yaratish mumkin emas.' };
      }

      // 🔎 Email va username unikal tekshiruv
      const [existingEmail, existingUsername] = await Promise.all([
        this.prisma.user.findUnique({ where: { email } }),
        this.prisma.user.findUnique({ where: { username } }),
      ]);

      if (existingEmail) return { message: '❌ Bu email allaqachon mavjud.' };
      if (existingUsername) return { message: '❌ Bu username allaqachon mavjud.' };

      const hashedPassword = await bcrypt.hash(password, 10);

      // 🎯 Role berilmasa CLIENT bo‘ladi
      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          role: role ?? UserRole.CLIENT,
          status: UserStatus.PENDING,
          isActive: false,
        },
      });

      return { message: '✅ Foydalanuvchi muvaffaqiyatli yaratildi.', data: this.formatUser(newUser) };
    } catch (error) {
      this.logger.error('❌ create() xatosi:', error);
      return { message: 'Foydalanuvchi yaratishda xatolik yuz berdi.', error: error.message };
    }
  }

  /** 🔍 Barcha foydalanuvchilar */
  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return { message: '✅ Foydalanuvchilar ro‘yxati', data: users.map(this.formatUser) };
    } catch (error) {
      this.logger.error('❌ findAll() xatosi:', error);
      return { message: 'Foydalanuvchilarni olishda xatolik yuz berdi.', error: error.message };
    }
  }

  /** 🔍 Bitta foydalanuvchi */
  async findOne(id: string) {
    try {
      const userId = +id;
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) return { message: `❌ #${id} foydalanuvchi topilmadi.` };
      return { message: '✅ Foydalanuvchi topildi.', data: this.formatUser(user) };
    } catch (error) {
      this.logger.error('❌ findOne() xatosi:', error);
      return { message: 'Foydalanuvchini olishda xatolik yuz berdi.', error: error.message };
    }
  }

  /** 🔄 Foydalanuvchini yangilash */
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userId = +id;
      const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!existingUser) return { message: `❌ #${id} foydalanuvchi topilmadi.` };

      // ❌ Superadmin rolini o‘zgartirish yoki unga aylantirish taqiqlanadi
      if (
        existingUser.role === UserRole.SUPER_ADMIN ||
        updateUserDto.role === UserRole.SUPER_ADMIN
      ) {
        return { message: '🚫 Super Admin rolini o‘zgartirish mumkin emas.' };
      }

      // 🔒 Parol hash
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // 🔎 Email yoki username unikal tekshirish (agar o‘zgartirilgan bo‘lsa)
      if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
        const emailExists = await this.prisma.user.findUnique({ where: { email: updateUserDto.email } });
        if (emailExists) return { message: '❌ Bu email allaqachon mavjud.' };
      }

      if (updateUserDto.username && updateUserDto.username !== existingUser.username) {
        const usernameExists = await this.prisma.user.findUnique({ where: { username: updateUserDto.username } });
        if (usernameExists) return { message: '❌ Bu username allaqachon mavjud.' };
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...updateUserDto,
        },
      });

      return { message: '✅ Foydalanuvchi yangilandi.', data: this.formatUser(updatedUser) };
    } catch (error) {
      this.logger.error('❌ update() xatosi:', error);
      return { message: 'Foydalanuvchini yangilashda xatolik yuz berdi.', error: error.message };
    }
  }

  /** ❌ Foydalanuvchini o‘chirish */
  async remove(id: string) {
    try {
      const userId = +id;
      const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!existingUser) return { message: `❌ #${id} foydalanuvchi topilmadi.` };

      // ❌ Superadminni o‘chirish mumkin emas
      if (existingUser.role === UserRole.SUPER_ADMIN) {
        return { message: '🚫 Super Adminni o‘chirish mumkin emas.' };
      }

      await this.prisma.user.delete({ where: { id: userId } });
      return { message: '✅ Foydalanuvchi muvaffaqiyatli o‘chirildi.' };
    } catch (error) {
      this.logger.error('❌ remove() xatosi:', error);
      return { message: 'Foydalanuvchini o‘chirishda xatolik yuz berdi.', error: error.message };
    }
  }

  /** 🧩 Foydalanuvchini formatlash */
  private formatUser(user: any) {
    return {
      ...user,
      id: user.id?.toString(),
      created_at: user.created_at ? new Date(user.created_at) : null,
      updated_at: user.updated_at ? new Date(user.updated_at) : null,
    };
  }
}
