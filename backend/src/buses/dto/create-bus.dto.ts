import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateBusDto {
  @IsString() bus_number: string;
  @IsOptional() @IsInt() capacity?: number;
  @IsOptional() @IsInt() driver_id?: number;
  @IsOptional() @IsInt() route_id?: number;
}
