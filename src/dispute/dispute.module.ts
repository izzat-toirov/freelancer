import { Module } from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { DisputeController } from './dispute.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [DisputeController],
  providers: [DisputeService, PrismaService],
  imports: [PrismaModule],
})
export class DisputeModule {}
