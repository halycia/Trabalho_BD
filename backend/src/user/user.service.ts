import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(private db: DatabaseService) { }

  async findUserByEmail(emailUsuario: string): Promise<User> {
    const result = await this.db.query(
      'SELECT * FROM usuario WHERE email = $1',
      [emailUsuario],
    );
    const user_found = result.rows[0];
    if (!user_found) {
      throw new NotFoundException (`Usuário com email ${emailUsuario} não encontrado`)
    }
    return result.rows[0] as User;
  }

  async findUserById(idUsuario: number): Promise<User> {
    const result = await this.db.query(
      'SELECT * FROM usuario WHERE id = $1',
      [idUsuario],
    );
    const user_found = result.rows[0];
    if (!user_found) {
      throw new NotFoundException (`Usuário com id ${idUsuario} não encontrado`)
    }
    return result.rows[0] as User;
  }

  async findUserByUsername(username: string): Promise<User> {
    const result = await this.db.query(
      'SELECT * FROM usuario WHERE username = $1',
      [username],
    );
    const user_found = result.rows[0];
    if (!user_found) {
      throw new NotFoundException (`Usuário com username ${username} não encontrado`)
    };
    return result.rows[0] as User;
  }

  async findAllUsers(): Promise<User[]> {
    const result = await this.db.query('SELECT * FROM usuario');
    return result.rows as User[];
  }


  async createUser(novoUsuario: CreateUserDto) {
    try {
      await this.findUserByEmail(novoUsuario.email);
      throw new ConflictException('Email já está em uso');
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }
    
    try {
      await this.findUserByUsername(novoUsuario.username);
      throw new ConflictException('Nome de usuário já está em uso');
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
      
    }
    const result = await this.db.query(
      `INSERT INTO usuario (email, username, nome, senha)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        novoUsuario.email, 
        novoUsuario.username, 
        novoUsuario.nome,
        novoUsuario.senha
      ]
    );
    return result.rows[0] as User;
  }


  async updateUser(idUsuario: number, updateDto: UpdateUserDto, id_payload: number) {
    const localUser = await this.findUserById(idUsuario);
    if (idUsuario !== id_payload) {
      throw new ForbiddenException ('Você só pode atualizar seu próprio perfil');
    }
    if (updateDto.email && updateDto.email !== localUser.email) {
      try {
        await this.findUserByEmail(updateDto.email);
        throw new ConflictException('Email já está em uso');
      } catch (error) {
        if (!(error instanceof NotFoundException)) {
          throw error;
        }
      }
    }

    if (updateDto.username && updateDto.username !== localUser.username) {
      try {
        await this.findUserByUsername(updateDto.username);
        throw new ConflictException('Nome de usuário já está em uso');
      } catch (error) {
        if (!(error instanceof NotFoundException)) {
          throw error;
        }
      }
    }
    await this.db.query(
        `UPDATE usuario SET nome=$1, email=$2, username=$3, senha=$4 WHERE id = $5`,
        [
          updateDto.nome ?? localUser.nome,
          updateDto.email ?? localUser.email,
          updateDto.username ?? localUser.username,
          updateDto.senha ?? localUser.senha,
          idUsuario
        ]
      );
      return { message: "Usuário atualizado com sucesso " };
  }

  async deleteUser(idUsuario: number, id_payload: number) {
    await this.findUserById(idUsuario);
    if (idUsuario !== id_payload) {
      throw new ForbiddenException('Você só pode deletar sua própria conta');
    }
    await this.db.query(
      'DELETE FROM usuario WHERE id = $1',
      [idUsuario],
    );
    return {
      message: `Usuário com id ${idUsuario} deletado com sucesso`,
    }
  }
}