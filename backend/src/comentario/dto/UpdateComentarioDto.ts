import { IsNotEmpty } from 'class-validator';

export class UpdateComentarioDto {
  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  data: Date | string;

  @IsNotEmpty()
  id_avaliacao: number;

  @IsNotEmpty()
  id_usuario: number;
}