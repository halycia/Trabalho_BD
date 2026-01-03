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

  async findUserByEmail(email: string): Promise<User> {
    const result = await this.db.query(
      'SELECT * FROM usuario WHERE email = $1',
      [email],
    );
    const user_found = result.rows[0];
    if (!user_found) {
      throw new NotFoundException (`Usuário com email ${email} não encontrado`)
    }
    return result.rows[0] as User;
  }

  async findUserById(id: number): Promise<User> {
    const result = await this.db.query(
      'SELECT * FROM usuario WHERE id = $1',
      [id],
    );
    const user_found = result.rows[0];
    if (!user_found) {
      throw new NotFoundException (`Usuário com id ${id} não encontrado`)
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
       VALUES ($1, $2, $3, $4)`,
      [
        novoUsuario.email, 
        novoUsuario.username, 
        novoUsuario.nome,
        novoUsuario.senha
      ]
    );
    return { message: "Usuário criado com sucesso" };
  }


  async updateUser(id: number, updates: UpdateUserDto) {
    const localUser = await this.findUserById(id);

    if (updates.email && updates.email !== localUser.email) {
      try {
        await this.findUserByEmail(updates.email);
        throw new ConflictException('Email já está em uso');
      } catch (error) {
        if (!(error instanceof NotFoundException)) {
          throw error;
        }
      }
    }

    if (updates.username && updates.username !== localUser.username) {
      try {
        await this.findUserByUsername(updates.username);
        throw new ConflictException('Nome de usuário já está em uso');
      } catch (error) {
        if (!(error instanceof NotFoundException)) {
          throw error;
        }
      }
    }
    const result = await this.db.query(
        `UPDATE usuario SET nome=$1, email=$2, username=$3, senha=$4 WHERE id = $5`,
        [
          updates.nome ?? localUser.nome,
          updates.email ?? localUser.email,
          updates.username ?? localUser.username,
          updates.senha ?? localUser.senha,
          id
        ]
      );
      return { message: "Usuário atualizado com sucesso " };
  }

  async deleteUser(id: number) {
    const deletingUser = await this.findUserById(id);
    const result = await this.db.query(
      'DELETE FROM usuario WHERE id = $1',
      [id],
    );
    return {
      message: `Usuário com id ${id} deletado com sucesso`,
    }
  }
}