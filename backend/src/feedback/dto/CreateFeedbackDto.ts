import {IsNotEmpty} from 'class-validator';

export class CreateFeedbackDto {


  @IsNotEmpty()
  data: Date;

  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  idsetor: number;

  @IsNotEmpty()
  emailusuario: string;
}
