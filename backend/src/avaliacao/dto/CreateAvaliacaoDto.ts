import {IsDate, IsNotEmpty} from 'class-validator';

export class CreateAvaliacaoDto {
  @IsNotEmpty()
  nota: number;

  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  @IsDate()
  data: Date;
}
