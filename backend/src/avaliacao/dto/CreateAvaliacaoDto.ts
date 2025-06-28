import {IsDate, IsNotEmpty} from 'class-validator';

export class CreateAvaliacaoDto {
  @IsNotEmpty()
  nota: number;

  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  dataavaliacao: Date | string;

  @IsNotEmpty()
  dataconsumo: Date |string;

  @IsNotEmpty()
  emailusuario: string;

  @IsNotEmpty()
  refeicao: string;

  @IsNotEmpty()
  nomeprato: string;
}
