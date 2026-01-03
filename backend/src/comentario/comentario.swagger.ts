import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth
} from '@nestjs/swagger';

const InvalidDataResponse = () => applyDecorators(
  ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
);

const NotFoundResponse = () => applyDecorators(
  ApiResponse({
    status: 404,
    description: 'Comentário não encontrado',
  })
);

const AuthRequired = () => applyDecorators(
  ApiBearerAuth('JWT-auth')
);

export const CreateComentarioDocs = () => applyDecorators(
  ApiOperation({ summary: 'Criar novo comentário' }),
  ApiResponse({
    status: 201,
    description: 'Comentário criado com sucesso',
  }),
  InvalidDataResponse(),
  AuthRequired()
);

export const GetAllComentariosDocs = () => applyDecorators(
  ApiOperation({ summary: 'Listar todos os comentários' }),
  ApiResponse({
    status: 200,
    description: 'Lista de comentários retornada com sucesso',
  }),
);

export const GetComentarioByIdDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar comentário por ID' }),
  ApiParam({ name: 'id', description: 'ID do comentário', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Comentário encontrado',
  }),
  NotFoundResponse()
);

export const GetComentariosByAvaliacaoDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar comentários de uma avaliação' }),
  ApiParam({ name: 'idAvaliacao', description: 'ID da avaliação', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Comentários da avaliação encontrados',
  }),
  NotFoundResponse()
);

export const UpdateComentarioDocs = () => applyDecorators(
  ApiOperation({ summary: 'Atualizar comentário' }),
  ApiParam({ name: 'id', description: 'ID do comentário', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Comentário atualizado com sucesso',
  }),
  NotFoundResponse(),
  InvalidDataResponse(),
  AuthRequired()
);

export const DeleteComentarioDocs = () => applyDecorators(
  ApiOperation({ summary: 'Deletar comentário' }),
  ApiParam({ name: 'id', description: 'ID do comentário', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Comentário deletado com sucesso'
  }),
  NotFoundResponse(),
  InvalidDataResponse(),
  AuthRequired()
);