import { applyDecorators } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiParam 
} from '@nestjs/swagger';

const NotFoundResponse = () => applyDecorators(
  ApiResponse({
    status: 404,
    description: 'Setor não encontrado',
  })
);

export const GetAllSetoresDocs = () => applyDecorators(
  ApiOperation({ summary: 'Listar todos os setores' }),
  ApiResponse({
    status: 200,
    description: 'Lista de setores retornada com sucesso',
  }),
);

export const GetSetorByIdDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar setor por ID' }),
  ApiParam({ name: 'id', description: 'ID do setor', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Setor encontrado',
  }),
  NotFoundResponse()
);

export const GetSetoresByCampusDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar setores por campus' }),
  ApiParam({ name: 'idCampus', description: 'ID do campus', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Setores do campus encontrados',
  }),
  NotFoundResponse()
);
