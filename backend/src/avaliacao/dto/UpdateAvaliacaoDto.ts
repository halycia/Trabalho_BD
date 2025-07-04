import { IsNotEmpty } from 'class-validator';

export class UpdateAvaliacaoDto {
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
  id_prato: number;
}
