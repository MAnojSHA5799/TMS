// src/routes/routes.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RouteEntity } from './entities/route.entity';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.routesService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<RouteEntity>) {
    return this.routesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<RouteEntity>) {
    return this.routesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.routesService.remove(id);
  }
}
