import {IsNotEmpty} from 'class-validator';

export class CreateFeedbackDto {
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
