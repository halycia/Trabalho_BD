import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserService } from '../user/user.service';
import { AvaliacaoService } from '../avaliacao/avaliacao.service';
import { CreateComentarioDto } from './dto/CreateComentarioDto';
import { UpdateComentarioDto } from './dto/UpdateComentarioDto';
import { Comentario } from './comentario.entity';

@Injectable()
export class ComentarioService {
  constructor(private db: DatabaseService) {}
  userService = new UserService(this.db);
  avaliacaoService = new AvaliacaoService(this.db);

  async create(createComentarioDto: CreateComentarioDto) {
    const userExists = await this.userService.findUserByEmail(
      createComentarioDto.emailUsuario,
    );
    if (!userExists) {
      throw new ConflictException('Não existe usuário com esse email');
    }
    const avaliacaoExists = await this.avaliacaoService.findAvaliacaoById(
      createComentarioDto.idAvaliacao,
    );
    if (!avaliacaoExists) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    const result = await this.db.query(
      'INSERT INTO comentario (texto, data, idAvaliacao, emailUsuario) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        createComentarioDto.texto,
        createComentarioDto.data,
        createComentarioDto.idAvaliacao,
        createComentarioDto.emailUsuario,
      ],
    );
    return result.rows[0] as Comentario;
  }

  async findAll() {
    const result = await this.db.query('SELECT * FROM Comentario');
    return result.rows as Comentario[];
  }

  async findOne(id: number) {
    const result = await this.db.query(
      'SELECT * FROM Comentario WHERE id = $1',
      [id],
    );
    if (result.rows.length === 0) {
      throw new NotFoundException('Comentário não encontrado');
    }
    return result.rows[0] as Comentario;
  }

  async update(id: number, updateComentarioDto: UpdateComentarioDto) {
    const comentario = await this.findOne(id);

    const updatedComentario = {
      ...comentario,
      ...updateComentarioDto,
    };

    const userExists = await this.userService.findUserByEmail(
      updatedComentario.emailUsuario,
    );
    if (!userExists) {
      throw new ConflictException('Não existe usuário com esse email');
    }
    const avaliacaoExists = await this.avaliacaoService.findAvaliacaoById(
      updatedComentario.idAvaliacao,
    );
    if (!avaliacaoExists) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    const result = await this.db.query(
      'UPDATE comentario SET texto = $1, data = $2, qntCurtidas = $3, idAvaliacao = $4, emailUsuario = $5 WHERE id = $6 RETURNING *',
      [
        updatedComentario.texto,
        updatedComentario.data,
        updatedComentario.qntCurtidas,
        updatedComentario.idAvaliacao,
        updatedComentario.emailUsuario,
        id,
      ],
    );
    return result.rows[0] as Comentario;
  }

  async remove(id: number) {
    const result = await this.db.query(
      'DELETE FROM comentario WHERE id = $1 RETURNING *',
      [id],
    );
    if (result.rows.length === 0) {
      throw new NotFoundException('Comentário não encontrado');
    }
    return result.rows[0];
  }
}
