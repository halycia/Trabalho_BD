import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './user.entity'; 
@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

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
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (updates.email) {
      const UserEmail = await this.findUserByEmail(updates.email);
      if (UserEmail){
        throw new ConflictException('Email já cadastrado');
      }
    }
    if (updates.username) {
      const UserUsername = await this.findUserByUsername(updates.username);
      if (UserUsername) {
        throw new ConflictException('Nome de usuário em uso');
      }
    }

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        fields.push(`${key} = $${paramIndex++}`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new BadRequestException('Nenhum dado informado para atualização');
    }

    values.push(email); 
    try {
        const userUpdated = await this.findUserByEmail(email);
        if (!userUpdated) {
            throw new NotFoundException(`Usuário com email ${email} não encontrado`);
        }
      const result = await this.db.query(
        `UPDATE usuario SET ${fields.join(', ')} WHERE email = $${paramIndex}`,
        values,
      );

      return result.rows[0];
    } catch (error: any) {     
        throw new InternalServerErrorException('Atualização falhou');
    }
  }

  async deleteUser(email: string) {
    const result = await this.db.query(
      'DELETE FROM usuario WHERE email = $1',
      [email],
    );
    const deletedUser = result.rows[0];
    if (!deletedUser) {
      return null;
    }
    return { deletedUser };
  }

}
