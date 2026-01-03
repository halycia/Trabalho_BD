import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'joao_silva',
  })
  username: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  nome: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token JWT para autenticação',
  })
  access_token: string;

  @ApiProperty({
    description: 'Dados do usuário logado',
  })
  user: UserResponseDto;
}