// src/routes/routes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteEntity } from './entities/route.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly routeRepo: Repository<RouteEntity>,
  ) {}

  findAll() {
    return this.routeRepo.find({ relations: ['tenant'] });
  }

  findOne(id: number) {
    return this.routeRepo.findOne({ where: { route_id: id }, relations: ['tenant'] });
  }

  create(data: Partial<RouteEntity>) {
    const newRoute = this.routeRepo.create(data);
    return this.routeRepo.save(newRoute);
  }

  async update(id: number, data: Partial<RouteEntity>) {
    await this.routeRepo.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.routeRepo.delete(id);
  }
}
