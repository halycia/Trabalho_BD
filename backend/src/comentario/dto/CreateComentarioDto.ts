import { IsNotEmpty } from 'class-validator';

export class CreateComentarioDto {
  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  data: Date | string;

  @IsNotEmpty()
  idavaliacao: number;

  @IsNotEmpty()
  idusuario: number;
}