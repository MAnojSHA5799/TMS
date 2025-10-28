import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private svc: TenantsService) {}

  @Post()
  create(@Body() dto: CreateTenantDto) { return this.svc.create(dto); }

  @Get()
  list() { return this.svc.findAll(); }

  @Get(':id')
  get(@Param('id') id: string) { return this.svc.findOne(+id); }

  @Put(':id')
  update(@Param('id') id:string, @Body() dto: Partial<CreateTenantDto>) { return this.svc.update(+id, dto); }

  @Delete(':id')
  remove(@Param('id') id:string) { return this.svc.remove(+id); }
}
