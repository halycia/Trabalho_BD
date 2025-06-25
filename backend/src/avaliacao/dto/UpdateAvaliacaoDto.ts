import {IsDate, IsOptional, IsString} from 'class-validator';

export class UpdateAvaliacaoDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  nota?: number;

  @IsOptional()
  @IsString()
  texto?: string;

  @IsOptional()
  @IsDate({}, { message: 'Invalid date format' })
  data?: string;

  @IsOptional()
  curtidas?: number;
}
