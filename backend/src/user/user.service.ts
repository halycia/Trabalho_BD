import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(private db: DatabaseService) { }

  async findUserByEmail(email: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM usuario WHERE email = $1',
      [email],
    );
    return result.rows[0] as User ?? null;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM usuario WHERE username = $1',
      [username],
    );
    return result.rows[0] as User ?? null;
  }

  async createUser(novoUsuario: CreateUserDto) {
    const UserEmail = await this.findUserByEmail(novoUsuario.email);
    if (UserEmail) {
      throw new ConflictException('Email já cadastrado');
    }

    const UserUsername = await this.findUserByUsername(novoUsuario.username);
    if (UserUsername) {
      throw new ConflictException('Nome de usuário em uso');
    }

    const result = await this.db.query(
      `INSERT INTO usuario (email, username, nome, senha, telefone)
       VALUES ($1, $2, $3, $4, $5)`,
      [novoUsuario.email, novoUsuario.username, novoUsuario.nome,
      novoUsuario.senha, novoUsuario.telefone ?? null],
    );

    return result.rows[0] as User;
  }

  async findAllUsers(): Promise<User[]> {
    const result = await this.db.query('SELECT * FROM usuario');
    return result.rows as User[];
  }


  async updateUser(email: string, updates: UpdateUserDto) {

    if (updates.email) {
      const UserEmail = await this.findUserByEmail(updates.email);
      if (UserEmail && UserEmail.email !== email) {
        throw new ConflictException('Email já cadastrado');
      }
    }
    if (updates.username) {
      const UserUsername = await this.findUserByUsername(updates.username);
      if (UserUsername && UserUsername.email !== email) {
        throw new ConflictException('Nome de usuário em uso');
      }
    }
    try {
      const userUpdated = await this.findUserByEmail(email);
      if (!userUpdated) {
        throw new NotFoundException(`Usuário com email ${email} não encontrado`);
      }
      const result = await this.db.query(
        `UPDATE usuario 
        SET nome=$1, email=$2,
        username=$3, senha=$4,
        telefone=$5
         WHERE email = $6 `, [
        updates.nome ?? userUpdated.nome,
        updates.email ?? userUpdated.email,
        updates.username ?? userUpdated.username,
        updates.senha ?? userUpdated.senha,
        updates.telefone !== undefined ? updates.telefone : userUpdated.telefone,
        email
      ]
      );

      return result.rows[0];
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      throw new InternalServerErrorException('Atualização falhou');
    }
  }

  async deleteUser(email: string) {
    const deletingUser = await this.findUserByEmail(email);
    if (!deletingUser) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }
    const result = await this.db.query(
      'DELETE FROM usuario WHERE email = $1',
      [email],
    );
    return {
      message: `Usuário com email ${email} deletado com sucesso`,
    }
  }
}