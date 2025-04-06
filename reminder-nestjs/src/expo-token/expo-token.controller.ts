import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpoTokenService } from './expo-token.service';
import { CreateExpoTokenDto } from './dto/create-expo-token.dto';

@Controller('expo-token')
export class ExpoTokenController {
  constructor(private readonly expoTokenService: ExpoTokenService) {}

  @Post()
  create(@Body() createExpoTokenDto: CreateExpoTokenDto) {
    return this.expoTokenService.create(createExpoTokenDto);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.expoTokenService.findAllByUser(+userId);
  }

  @Get(':token')
  findOne(@Param('token') token: string) {
    return this.expoTokenService.findOne(token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() isActive: boolean) {
    return this.expoTokenService.update(+id, isActive);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expoTokenService.remove(+id);
  }
}
