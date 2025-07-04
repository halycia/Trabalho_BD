import { IsNotEmpty } from 'class-validator';

export class UpdateAvaliacaoDto {
  @IsNotEmpty()
  nota: number;

  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  dataavaliacao: Date | string;

  @IsNotEmpty()
  dataconsumo: Date | string;

  @IsNotEmpty()
  idusuario: number;

  @IsNotEmpty()
  idprato: number;
}
