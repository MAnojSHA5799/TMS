// src/auth/dto/signup-admin.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupAdminDto {
  @IsString() tenant_name: string;
  @IsString() tenant_type: string;
  @IsString() admin_name: string;
  @IsEmail() email: string;
  @MinLength(6) password: string;
}
