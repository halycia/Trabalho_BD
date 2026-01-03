import { applyDecorators } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiBearerAuth,
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
    description: 'Usuário não encontrado',
  })
);
const ConflictResponse = () => applyDecorators(
  ApiResponse({
    status: 409,
    description: 'E-mail ou username já em uso',
  })
);

const AuthRequired = () => applyDecorators(
  ApiBearerAuth('JWT-auth')
);

export const CreateUserDocs = () => applyDecorators(
  ApiOperation({ summary: 'Criar novo usuário' }),
  ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  }),
  ConflictResponse(),
  NotFoundResponse(),
  InvalidDataResponse(),
  AuthRequired()
);

export const GetAllUsersDocs = () => applyDecorators(
  ApiOperation({ summary: 'Listar todos os usuários' }),
  ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  }),
  NotFoundResponse(),
    InvalidDataResponse()
);

export const GetUserByEmailDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar usuário por email' }),
  ApiParam({ name: 'email', description: 'Email do usuário' }),
  ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
  }),
  NotFoundResponse(),
    InvalidDataResponse()
);

export const GetUserByUsernameDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar usuário por username' }),
  ApiParam({ name: 'username', description: 'Username do usuário' }),
  ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
  }),
  NotFoundResponse(),
    InvalidDataResponse()
);

export const GetUserByIdDocs = () => applyDecorators(
  ApiOperation({ summary: 'Buscar usuário por ID' }),
  ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
  }),
  NotFoundResponse(),
    InvalidDataResponse()
);

export const UpdateUserDocs = () => applyDecorators(
  ApiOperation({ summary: 'Atualizar usuário' }),
  ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
  }),
  ConflictResponse(),
  NotFoundResponse(),
    InvalidDataResponse(),
  AuthRequired()
);

export const GetCurrentUserProfileDocs = () => applyDecorators(
  ApiOperation({ 
    summary: 'Obter perfil do usuário autenticado',
    description: 'Retorna as informações privadas do usuário atualmente logado. Este endpoint permite ao usuário acessar suas próprias informações sem precisar fornecer seu ID, utilizando apenas o token de autenticação.'
  }),
  ApiResponse({
    status: 200,
    description: 'Perfil do usuário retornado com sucesso',
  }),
  ApiResponse({
    status: 401,
    description: 'Token de autenticação inválido ou ausente',
  }),
  NotFoundResponse(),
  InvalidDataResponse(),
  AuthRequired()
);

export const DeleteUserDocs = () => applyDecorators(
  ApiOperation({ summary: 'Deletar usuário' }),
  ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' }),
  ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso',
  }),
  NotFoundResponse(),
    InvalidDataResponse(),
  AuthRequired()
);