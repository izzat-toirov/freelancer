import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wallet' })
  create(@Body() dto: CreateWalletDto) {
    return this.walletService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallets' })
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wallet by ID' })
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update wallet by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateWalletDto) {
    return this.walletService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete wallet by ID' })
  remove(@Param('id') id: string) {
    return this.walletService.remove(Number(id));
  }
}
