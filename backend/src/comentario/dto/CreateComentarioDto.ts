import { IsNotEmpty } from 'class-validator';

export class CreateComentarioDto {
  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  data: Date | string;

  @IsNotEmpty()
  idAvaliacao: number;

  @IsNotEmpty()
  idUsuario: number;
}