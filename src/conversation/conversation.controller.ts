import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@ApiTags('Conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new conversation' })
  @ApiResponse({ status: 201, description: 'Conversation created successfully' })
  create(@Body() dto: CreateConversationDto) {
    return this.conversationService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all conversations' })
  findAll() {
    return this.conversationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one conversation by ID' })
  findOne(@Param('id') id: string) {
    return this.conversationService.findOne(BigInt(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update conversation by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateConversationDto) {
    return this.conversationService.update(BigInt(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete conversation by ID' })
  remove(@Param('id') id: string) {
    return this.conversationService.remove(BigInt(id));
  }
}
