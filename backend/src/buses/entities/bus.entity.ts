// src/buses/entities/bus.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { User } from '../../users/entities/user.entity';

@Entity('buses')
export class Bus {
  @PrimaryGeneratedColumn()
  bus_id: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column()
  tenant_id: number;

  @Column({ length: 50 })
  bus_number: string;

  @Column({ nullable: true })
  capacity: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'driver_id' })
  driver?: User;

  @Column({ nullable: true })
  driver_id?: number;

  @Column({ nullable: true })
  route_id?: number;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
