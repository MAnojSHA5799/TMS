// src/routes/entities/route.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity('routes')
export class RouteEntity {
  @PrimaryGeneratedColumn()
  route_id: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column()
  tenant_id: number;

  @Column({ length: 100 })
  route_name: string;

  @Column({ length: 255 })
  start_location: string;

  @Column({ length: 255 })
  end_location: string;

  @Column('text', { array: true, nullable: true })
  stops: string[];

  @CreateDateColumn()
  created_at: Date;
}
