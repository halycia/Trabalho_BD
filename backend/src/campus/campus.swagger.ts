import { applyDecorators } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiParam 
} from '@nestjs/swagger';

const NotFoundResponse = () => applyDecorators(
  ApiResponse({
    status: 404,
    description: 'Campus não encontrado',
  })
);

export const GetAllCampusDocs = () => applyDecorators(
  ApiOperation({ summary: 'Listar todos os campus' }),
  ApiResponse({
    status: 200,
    description: 'Lista de campus retornada com sucesso',
  }),
);

export const GetCampusByIdDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar campus por ID' }),
  ApiParam({ name: 'id', description: 'ID do campus', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Campus encontrado',
  }),
  NotFoundResponse(),
);