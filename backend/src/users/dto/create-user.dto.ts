import { IsString, IsEmail, IsIn, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsIn(['admin', 'teacher', 'student', 'driver', 'parent', 'operator'])
  role: string;

  @IsOptional()
  tenant_id?: number;
}
