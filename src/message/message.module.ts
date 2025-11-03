import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService, PrismaService],
  imports: [PrismaModule],
})
export class MessageModule {}
