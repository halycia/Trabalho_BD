import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateComentarioDto {
  @ApiProperty({
    required: true,
    description: 'Texto atualizado do comentário',
    example: 'Concordo com a avaliação.',
  })
  @IsNotEmpty()
  @IsString()
  texto: string;

  @ApiProperty({
    required: true,
    description: 'Data de atualização do comentário',
    example: '2024-01-15T14:30:00Z',
  })
  @IsNotEmpty()
  data: Date | string;

  @ApiProperty({
    required: true,
    description: 'ID da avaliação comentada',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_avaliacao: number;

  @ApiProperty({
    required: true,
    description: 'ID do usuário que atualizou o comentário',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;
}