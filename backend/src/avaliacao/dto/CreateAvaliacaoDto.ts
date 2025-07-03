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
  idusuario: number;

  @IsNotEmpty()
  refeicao: string;

  @IsNotEmpty()
  idprato: number;
}
