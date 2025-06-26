import {IsDate, IsOptional, IsString} from 'class-validator';

export class UpdateAvaliacaoDto {
  @IsOptional()
  nota?: number;

  @IsOptional()
  @IsString()
  texto?: string;

  @IsOptional()
  @IsDate({}, { message: 'Invalid date format' })
  data?: Date;
}
