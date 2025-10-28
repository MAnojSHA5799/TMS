import { IsString, IsIn, IsOptional, IsEmail } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  tenant_name: string;

  @IsIn(['school','fleet','school_fleet'])
  tenant_type: 'school'|'fleet'|'school_fleet';

  @IsOptional() @IsEmail() contact_email?: string;
  @IsOptional() @IsString() contact_phone?: string;
  @IsOptional() @IsString() address?: string;
}
