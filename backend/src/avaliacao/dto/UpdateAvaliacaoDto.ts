import {IsNotEmpty} from 'class-validator';

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
  emailusuario: string;
  
  @IsNotEmpty()
  nomeprato: string;
}
