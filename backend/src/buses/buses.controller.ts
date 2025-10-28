// src/buses/buses.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BusesService } from './buses.service';
import { Bus } from './entities/bus.entity';

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Get()
  findAll() {
    return this.busesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.busesService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Bus>) {
    return this.busesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Bus>) {
    return this.busesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.busesService.remove(id);
  }
}
