import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // ✅ Get all users
  async findAll(): Promise<User[]> {
    return this.userRepo.find({ relations: ['tenant'] });
  }

  // ✅ Get single user
  async findOne(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { user_id: id }, relations: ['tenant'] });
  }

  // ✅ Create user (hash password)
  async create(userData: CreateUserDto): Promise<User> {
    const { password, full_name, email, role, tenant_id } = userData;
  
    // ✅ Hash password
    const password_hash = await bcrypt.hash(password, 10);
  
    // ✅ Explicitly cast `role` as UserRole so TS knows it’s valid
    const newUser = this.userRepo.create({
      full_name,
      email,
      role: role as User['role'],
      tenant_id,
      password_hash,
    });
  
    // ✅ Save to DB
    return await this.userRepo.save(newUser);
  }
  
  

  // ✅ Update user info
  async update(id: number, data: Partial<User>) {
    await this.userRepo.update(id, data);
    return this.findOne(id);
  }

  // ✅ Delete user
  async remove(id: number) {
    return this.userRepo.delete(id);
  }
}
