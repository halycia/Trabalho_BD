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
    description: 'Avaliação não encontrada',
  })
);

const AuthRequired = () => applyDecorators(
  ApiBearerAuth('JWT-auth')
);

export const CreateAvaliacaoDocs = () => applyDecorators(
  ApiOperation({ summary: 'Criar nova avaliação' }),
  ApiResponse({
    status: 201,
    description: 'Avaliação criada com sucesso',
  }),
  InvalidDataResponse(),
  AuthRequired()
);

export const GetAllAvaliacoesDocs = () => applyDecorators(
  ApiOperation({ summary: 'Listar todas as avaliações' }),
  ApiResponse({
    status: 200,
    description: 'Lista de avaliações retornada com sucesso',
  }),
);

export const GetAvaliacaoByIdDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar avaliação por ID' }),
  ApiParam({ name: 'id', description: 'ID da avaliação', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Avaliação encontrada',
  }),
  NotFoundResponse(),
);

export const GetAvaliacoesByUserDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar avaliações de um usuário' }),
  ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Avaliações do usuário encontradas',
  }),
  NotFoundResponse(),
);

export const GetAvaliacoesByPratoDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar avaliações de um prato' }),
  ApiParam({ name: 'id', description: 'ID do prato', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Avaliações do prato encontradas',
  }),
  NotFoundResponse(),
);

export const UpdateAvaliacaoDocs = () => applyDecorators(
  ApiOperation({ summary: 'Atualizar avaliação' }),
  ApiParam({ name: 'id', description: 'ID da avaliação', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Avaliação atualizada com sucesso',
  }),
  NotFoundResponse(),
  InvalidDataResponse(),
  AuthRequired()
);

export const DeleteAvaliacaoDocs = () => applyDecorators(
  ApiOperation({ summary: 'Deletar avaliação' }),
  ApiParam({ name: 'id', description: 'ID da avaliação', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Avaliação deletada com sucesso',
  }),
  NotFoundResponse(),
  InvalidDataResponse(),
  AuthRequired()
);