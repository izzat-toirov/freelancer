import { Module } from '@nestjs/common';
import { AdminLogService } from './admin-log.service';
import { AdminLogController } from './admin-log.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminLogController],
  providers: [AdminLogService],
  exports: [AdminLogService],
})
export class AdminLogModule {}
