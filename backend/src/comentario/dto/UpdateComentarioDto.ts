import { IsNotEmpty } from 'class-validator';

export class UpdateComentarioDto {
  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  data: Date | string;

  @IsNotEmpty()
  idavaliacao: number;

  @IsNotEmpty()
  idusuario: number;
}