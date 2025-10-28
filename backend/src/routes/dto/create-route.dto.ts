import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateRouteDto {
  @IsString() route_name: string;
  @IsString() start_location: string;
  @IsString() end_location: string;
  @IsOptional() @IsArray() stops?: string[];
}
