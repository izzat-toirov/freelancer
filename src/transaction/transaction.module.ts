import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService],
  imports   : [PrismaModule],
})
export class TransactionModule {}
