import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWalletDto) {
    try {
      // 👤 User mavjudligini tekshirish
      const user = await this.prisma.user.findUnique({
        where: { id: dto.user_id },
      });
      if (!user) throw new NotFoundException('User not found');

      // 💰 Wallet yaratish
      return await this.prisma.wallet.create({
        data: {
          user_id: dto.user_id,
          balance: new Prisma.Decimal(dto.balance ?? 0),
          currency: dto.currency ?? 'USD',
        },
        include: { user: true },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('User already has a wallet');
      }
      console.error('❌ Create Wallet Error:', error);
      throw new InternalServerErrorException('Failed to create wallet');
    }
  }

  async findAll() {
    try {
      return await this.prisma.wallet.findMany({
        include: { user: true },
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      console.error('❌ FindAll Wallet Error:', error);
      throw new InternalServerErrorException('Failed to fetch wallets');
    }
  }

  async findOne(id: number) {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { id },
        include: { user: true },
      });
      if (!wallet) throw new NotFoundException('Wallet not found');
      return wallet;
    } catch (error) {
      console.error('❌ FindOne Wallet Error:', error);
      throw new InternalServerErrorException('Failed to fetch wallet');
    }
  }

  async update(id: number, dto: UpdateWalletDto) {
    try {
      const exists = await this.prisma.wallet.findUnique({ where: { id } });
      if (!exists) throw new NotFoundException('Wallet not found');

      return await this.prisma.wallet.update({
        where: { id },
        data: {
          ...(dto.balance !== undefined && {
            balance: new Prisma.Decimal(dto.balance),
          }),
          ...(dto.currency && { currency: dto.currency }),
        },
        include: { user: true },
      });
    } catch (error: any) {
      console.error('❌ Update Wallet Error:', error);
      throw new InternalServerErrorException('Failed to update wallet');
    }
  }

  async remove(id: number) {
    try {
      const exists = await this.prisma.wallet.findUnique({ where: { id } });
      if (!exists) throw new NotFoundException('Wallet not found');

      return await this.prisma.wallet.delete({
        where: { id },
      });
    } catch (error) {
      console.error('❌ Delete Wallet Error:', error);
      throw new InternalServerErrorException('Failed to delete wallet');
    }
  }
}
