import {IsDate, IsNotEmpty} from 'class-validator';

export class CreateAvaliacaoDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  nota: number;

  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  @IsDate()
  data: string;

  @IsNotEmpty()
  curtidas: number;
}
