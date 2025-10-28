// src/tenants/entities/tenant.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn()
  tenant_id: number;

  @Column({ length: 100 })
  tenant_name: string;

  @Column({ length: 50 })
  tenant_type: 'school' | 'fleet' | 'school_fleet';

  @Column({ nullable: true })
  contact_email: string;

  @Column({ nullable: true })
  contact_phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => User, u => u.tenant)
  users: User[];
}
