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
  @ApiResponse({ status: 200, description: 'List of all disputes' })
  findAll() {
    return this.disputeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dispute by ID' })
  @ApiResponse({ status: 200, description: 'Single dispute record' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.disputeService.findOne(BigInt(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dispute' })
  @ApiResponse({ status: 200, description: 'Dispute updated successfully' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDisputeDto) {
    return this.disputeService.update(BigInt(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dispute' })
  @ApiResponse({ status: 200, description: 'Dispute deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.disputeService.remove(BigInt(id));
  }
}
