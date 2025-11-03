import { Module } from '@nestjs/common';
import { AdminLogService } from './admin-log.service';
import { AdminLogController } from './admin-log.controller';

@Module({
  controllers: [AdminLogController],
  providers: [AdminLogService],
})
export class AdminLogModule {}
