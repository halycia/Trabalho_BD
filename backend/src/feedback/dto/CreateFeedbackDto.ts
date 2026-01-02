import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {

  @ApiProperty({
    required: true,
    description: 'Data do feedback',
    example: '2024-01-15T16:00:00Z',
  })
  @IsNotEmpty()
  data: Date | string;

  @ApiProperty({
    required: true,
    description: 'Texto do feedback',
    example: 'Precisa melhorar o atendimento no balcão.',
  })
  @IsNotEmpty()
  @IsString()
  texto: string;

  @ApiProperty({
    required: true,
    description: 'Tipo do feedback',
    example: 'Reclamação',
    enum: ['Sugestão', 'Reclamação', 'Elogio', 'Dúvida'],
  })
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty({
    required: true,
    description: 'ID do setor relacionado ao feedback',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_setor: number;

  @ApiProperty({
    required: true,
    description: 'ID do usuário que enviou o feedback',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;
}
