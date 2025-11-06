import { Controller, Post, Get, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
import { UserRole } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    const role = UserRole.CLIENT;
    return this.ordersService.create(dto, role);
  }

  @Get()
  findAll(@Query() query: QueryOrdersDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    const role = UserRole.ADMIN;
    return this.ordersService.update(Number(id), dto, role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const role = UserRole.SUPER_ADMIN;
    return this.ordersService.remove(Number(id), role);
  }
}
