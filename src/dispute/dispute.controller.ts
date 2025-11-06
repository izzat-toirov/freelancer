import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Disputes')
@Controller('disputes')
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dispute' })
  @ApiResponse({ status: 201, description: 'Dispute created successfully' })
  create(@Body() dto: CreateDisputeDto) {
    return this.disputeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all disputes' })
  findAll() {
    return this.disputeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dispute by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.disputeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dispute' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDisputeDto) {
    return this.disputeService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dispute' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.disputeService.remove(id);
  }
}
