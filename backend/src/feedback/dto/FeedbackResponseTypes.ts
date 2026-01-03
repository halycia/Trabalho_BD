import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackResponseDto {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    example: 'Feedback criado com sucesso',
  })
  message: string;
}

export class UpdateFeedbackResponseDto {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    example: 'Feedback atualizado com sucesso',
  })
  message: string;
}

export class DeleteFeedbackResponseDto {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    example: 'Feedback com id 1 deletado com sucesso',
  })
  message: string;
}