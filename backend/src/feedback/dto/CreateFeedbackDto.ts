import {IsNotEmpty} from 'class-validator';

export class CreateFeedbackDto {

  @IsNotEmpty()
  data: Date | string;

  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  idsetor: number;

  @IsNotEmpty()
  idusuario: number;
}
