import {IsDate, IsOptional, IsString} from 'class-validator';

export class UpdateAvaliacaoDto {
  @IsOptional()
  nota?: number;

  @IsOptional()
  @IsString()
  texto?: string;

  @IsOptional()
  @IsDate()
  data?: Date;
}
