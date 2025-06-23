import {IsNotEmpty} from 'class-validator';

export class UpdateFeedbackDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  data: Date;

  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  idSetor: number;

  @IsNotEmpty()
  emailUsuario: string;
}