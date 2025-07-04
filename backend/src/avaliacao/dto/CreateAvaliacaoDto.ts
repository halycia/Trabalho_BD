import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsNotEmpty()
  nota: number;

  @IsNotEmpty()
  texto: string;

  @IsNotEmpty()
  data_avaliacao: Date | string;

  @IsNotEmpty()
  data_consumo: Date | string;

  @IsNotEmpty()
  id_usuario: number;

  @IsNotEmpty()
  refeicao: string;

  @IsNotEmpty()
  id_prato: number;
}
