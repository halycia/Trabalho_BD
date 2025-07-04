import { IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {

  @IsNotEmpty()
  data: Date | string;

  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  id_setor: number;

  @IsNotEmpty()
  id_usuario: number;
}
