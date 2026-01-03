import { applyDecorators } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiParam 
} from '@nestjs/swagger';


const NotFoundResponse = () => applyDecorators(
  ApiResponse({
    status: 404,
    description: 'Prato não encontrado',
  })
);

export const GetAllPratosDocs = () => applyDecorators(
  ApiOperation({ summary: 'Listar todos os pratos' }),
  ApiResponse({
    status: 200,
    description: 'Lista de pratos retornada com sucesso',
  }),
);

export const GetPratoByIdDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar prato por ID' }),
  ApiParam({ name: 'id', description: 'ID do prato', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Prato encontrado',
  }),
  NotFoundResponse(),
);

export const GetInfoPratosDocs = () => applyDecorators(
  ApiOperation({ summary: 'Listar informações detalhadas dos pratos' }),
  ApiResponse({
    status: 200,
    description: 'Informações detalhadas dos pratos retornadas com sucesso',
  }),
);

export const GetInfoPratoByIdDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar informações detalhadas de um prato' }),
  ApiParam({ name: 'id', description: 'ID do prato', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Informações detalhadas do prato encontradas',
  }),
  NotFoundResponse(),
);