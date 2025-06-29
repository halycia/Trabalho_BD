import { IsNotEmpty } from 'class-validator';

export class UpdateComentarioDto {
  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  data: Date | string;

  @IsNotEmpty()
  idAvaliacao: number;

  @IsNotEmpty()
  emailUsuario: string;
}