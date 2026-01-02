import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeedbackDto {
  @ApiProperty({
    required: true,
    description: 'Data da atualização do feedback',
    example: '2024-01-15T16:00:00Z',
  })

  @IsNotEmpty()
  data: Date | string;

  @ApiProperty({
    required: true,
    description: 'Texto do feedback atualizado',
    example: 'Já melhorou!',
  })

  @IsNotEmpty()
  @IsString()
  texto: string;

  @ApiProperty({
    required: true,
    description: 'Tipo do feedback atualizado',
    example: 'Elogio',
    enum: ['Sugestão', 'Reclamação', 'Elogio', 'Dúvida'],
  })
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty({
    required: true,
    description: 'ID do setor relacionado ao feedback atualizado',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_setor: number;

  @ApiProperty({
    required: true,
    description: 'ID do usuário que atualizou o feedback',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;
}