import { Module } from '@nestjs/common';
import { GigsService } from './gig.service';
import { GigsController } from './gig.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GigsController],
  providers: [GigsService, PrismaService],
  exports: [GigsService],
})
export class GigModule {}
