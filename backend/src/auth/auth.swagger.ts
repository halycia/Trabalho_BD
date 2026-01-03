import { applyDecorators } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse 
} from '@nestjs/swagger';
import { 
  LoginResponseDto 
} from './dto/AuthResponseTypes';

const InvalidCredentialsResponse = () => applyDecorators(
  ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
  })
);

const InvalidDataResponse = () => applyDecorators(
  ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
);

export const LoginDocs = () => applyDecorators(
  ApiOperation({ summary: 'Realizar login' }),
  ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso. Retorna token JWT.',
    type: LoginResponseDto,
  }),
  InvalidCredentialsResponse(),
  InvalidDataResponse()
);