import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Query, Param, ParseIntPipe, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { GigsService } from './gig.service';
import { CreateGigDto } from './dto/create-gig.dto';
import { UpdateGigDto } from './dto/update-gig.dto';
import { QueryGigsDto } from './dto/query-gigs.dto';

/**
 * NOTE:
 * - Bu controller misol uchun oddiy: auth middleware/guard mavjud deb hisoblayman.
 * - `req.user` ichida `{ id, role }` mavjud bo'lishi kerak (orma: auth strategy orqali).
 */

@Controller('gigs')
export class GigsController {
  constructor(private readonly gigsService: GigsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createDto: CreateGigDto, @Req() req: any) {
    const authUser = req.user; // { id, role } - auth layer taqdim etishi kerak
    return this.gigsService.create(createDto, authUser);
  }

  @Get()
  async findAll(@Query() query: QueryGigsDto) {
    return this.gigsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gigsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateGigDto, @Req() req: any) {
    const authUser = req.user;
    return this.gigsService.update(id, updateDto, authUser);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const authUser = req.user;
    return this.gigsService.remove(id, authUser);
  }
}
