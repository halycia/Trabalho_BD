import {IsDate, IsNotEmpty} from 'class-validator';

export class CreateAvaliacaoDto {
  @IsNotEmpty()
  nota: number;

  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  @IsDate()
  dataavaliacao: Date;

  @IsNotEmpty()
  @IsDate()
  dataconsumo: Date;

  @IsNotEmpty()
  emailusuario: string;

  @IsNotEmpty()
  nomeprato: string;
}
