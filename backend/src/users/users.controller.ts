import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ Get all users
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // ✅ Get single user
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  // ✅ Create user
  @Post()
  create(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  // ✅ Update user
  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<User>) {
    return this.usersService.update(id, data);
  }

  // ✅ Delete user
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
