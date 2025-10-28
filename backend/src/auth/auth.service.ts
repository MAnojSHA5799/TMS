import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Tenant) private tenantsRepo: Repository<Tenant>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async signupAdmin(dto: { tenant_name:string, tenant_type:string, admin_name:string, email:string, password:string }) {
    const exists = await this.usersRepo.findOne({ where: { email: dto.email }});
    if (exists) throw new BadRequestException('Email already exists');

    const tenant = this.tenantsRepo.create({
      tenant_name: dto.tenant_name,
      tenant_type: dto.tenant_type as any,
    });
    await this.tenantsRepo.save(tenant);

    const hash = await bcrypt.hash(dto.password, +(process.env.BCRYPT_SALT_ROUNDS ?? 10));
    const user = this.usersRepo.create({
      tenant_id: tenant.tenant_id,
      tenant,
      full_name: dto.admin_name,
      email: dto.email,
      password_hash: hash,
      role: 'admin'
    });
    await this.usersRepo.save(user);
    const token = this.jwt.sign({ user_id: user.user_id, tenant_id: tenant.tenant_id, role: user.role });
    return { token, user_id: user.user_id, tenant_id: tenant.tenant_id };
  }

  async login(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email }});
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwt.sign({ user_id: user.user_id, tenant_id: user.tenant_id, role: user.role });
    return { token, user_id: user.user_id, tenant_id: user.tenant_id, role: user.role };
  }
}
