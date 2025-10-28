// src/buses/buses.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entities/bus.entity';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepo: Repository<Bus>,
  ) {}

  findAll() {
    return this.busRepo.find({ relations: ['tenant', 'driver', 'route'] });
  }

  findOne(id: number) {
    return this.busRepo.findOne({ where: { bus_id: id }, relations: ['tenant', 'driver', 'route'] });
  }

  create(data: Partial<Bus>) {
    const bus = this.busRepo.create(data);
    return this.busRepo.save(bus);
  }

  async update(id: number, data: Partial<Bus>) {
    await this.busRepo.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.busRepo.delete(id);
  }
}
