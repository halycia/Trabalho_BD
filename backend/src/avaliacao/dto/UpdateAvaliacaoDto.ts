import {IsDate, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class UpdateAvaliacaoDto {
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
