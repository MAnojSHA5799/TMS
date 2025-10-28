import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';

export type UserRole = 'admin' | 'teacher' | 'student' | 'driver' | 'parent' | 'operator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column()
  tenant_id: number;

  @Column({ length: 100 })
  full_name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ type: 'varchar', length: 50 })
  role: UserRole; // ✅ simple enum-like string

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}

