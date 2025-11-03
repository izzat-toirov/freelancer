import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE
  async create(dto: CreateTransactionDto) {
    // Wallet mavjudligini tekshiramiz
    const walletExists = await this.prisma.wallet.findUnique({
      where: { id: BigInt(dto.wallet_id) },
    });
    if (!walletExists) {
      throw new NotFoundException(`Wallet with ID ${dto.wallet_id} not found`);
    }

    return this.prisma.transaction.create({
      data: {
        wallet_id: BigInt(dto.wallet_id),
        type: dto.type,
        amount: dto.amount,
        reference: dto.reference,
      },
      include: { wallet: true, payments: true },
    });
  }

  // ✅ FIND ALL
  async findAll() {
    return this.prisma.transaction.findMany({
      include: { wallet: true, payments: true },
      orderBy: { created_at: 'desc' },
    });
  }

  // ✅ FIND ONE
  async findOne(id: bigint) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: { wallet: true, payments: true },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  // ✅ UPDATE
  async update(id: bigint, dto: UpdateTransactionDto) {
    const existingTransaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!existingTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    // Agar wallet_id o‘zgartirilsa — wallet mavjudligini ham tekshirish
    if (dto.wallet_id) {
      const walletExists = await this.prisma.wallet.findUnique({
        where: { id: BigInt(dto.wallet_id) },
      });
      if (!walletExists) {
        throw new NotFoundException(`Wallet with ID ${dto.wallet_id} not found`);
      }
    }

    return this.prisma.transaction.update({
      where: { id },
      data: {
        ...(dto.wallet_id && { wallet_id: BigInt(dto.wallet_id) }),
        ...(dto.type && { type: dto.type }),
        ...(dto.amount && { amount: dto.amount }),
        ...(dto.reference && { reference: dto.reference }),
      },
      include: { wallet: true, payments: true },
    });
  }

  // ✅ DELETE
  async remove(id: bigint) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
