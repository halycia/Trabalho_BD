import { applyDecorators } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiBearerAuth 
} from '@nestjs/swagger';
import { 
  CreateFeedbackResponseDto, 
  UpdateFeedbackResponseDto, 
  DeleteFeedbackResponseDto 
} from './dto/FeedbackResponseTypes';

const InvalidDataResponse = () => applyDecorators(
  ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
);

const NotFoundResponse = () => applyDecorators(
  ApiResponse({
    status: 404,
    description: 'Feedback não encontrado',
  })
);

const UserNotFoundResponse = () => applyDecorators(
  ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
);

const AuthRequired = () => applyDecorators(
  ApiBearerAuth('JWT-auth')
);

export const CreateFeedbackDocs = () => applyDecorators(
  ApiOperation({ summary: 'Criar novo feedback' }),
  ApiResponse({
    status: 201,
    description: 'Feedback criado com sucesso',
    type: CreateFeedbackResponseDto,
  }),
  InvalidDataResponse(),
  AuthRequired()
);

export const GetAllFeedbacksDocs = () => applyDecorators(
  ApiOperation({ summary: 'Listar todos os feedbacks' }),
  ApiResponse({
    status: 200,
    description: 'Lista de feedbacks retornada com sucesso',
  }),
);

export const GetFeedbacksByUserDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar feedbacks de um usuário' }),
  ApiParam({ name: 'idusuario', description: 'ID do usuário', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Feedbacks do usuário encontrados',
  }),
  UserNotFoundResponse(),
);

export const GetFeedbackByIdDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar feedback por ID' }),
  ApiParam({ name: 'id', description: 'ID do feedback', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Feedback encontrado',
  }),
  NotFoundResponse(),
);

export const UpdateFeedbackDocs = () => applyDecorators(
  ApiOperation({ summary: 'Atualizar feedback' }),
  ApiParam({ name: 'id', description: 'ID do feedback', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Feedback atualizado com sucesso',
    type: UpdateFeedbackResponseDto,
  }),
  NotFoundResponse(),
  InvalidDataResponse(),
  AuthRequired()
);

export const DeleteFeedbackDocs = () => applyDecorators(
  ApiOperation({ summary: 'Deletar feedback' }),
  ApiParam({ name: 'id', description: 'ID do feedback', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Feedback deletado com sucesso',
    type: DeleteFeedbackResponseDto,
  }),
  NotFoundResponse(),
  InvalidDataResponse(),
  AuthRequired()
);