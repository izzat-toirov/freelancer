import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminLogService } from './admin-log.service';
import { CreateAdminLogDto } from './dto/create-admin-log.dto';
import { UpdateAdminLogDto } from './dto/update-admin-log.dto';

@Controller('admin-log')
export class AdminLogController {
  constructor(private readonly adminLogService: AdminLogService) {}

  @Post()
  create(@Body() createAdminLogDto: CreateAdminLogDto) {
    return this.adminLogService.create(createAdminLogDto);
  }

  @Get()
  findAll() {
    return this.adminLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminLogDto: UpdateAdminLogDto) {
    return this.adminLogService.update(+id, updateAdminLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminLogService.remove(+id);
  }
}
