import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(@InjectRepository(Tenant) private repo: Repository<Tenant>) {}

  create(dto: CreateTenantDto) {
    const t = this.repo.create(dto as any);
    return this.repo.save(t);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const t = await this.repo.findOne({ where: { tenant_id: id }});
    if (!t) throw new NotFoundException('Tenant not found');
    return t;
  }

  async update(id:number, dto: Partial<CreateTenantDto>) {
    const t = await this.findOne(id);
    Object.assign(t, dto);
    return this.repo.save(t);
  }

  async remove(id:number) {
    const t = await this.findOne(id);
    return this.repo.remove(t);
  }
}
