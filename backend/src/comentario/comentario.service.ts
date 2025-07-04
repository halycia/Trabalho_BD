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
  constructor(private db: DatabaseService) { }
  userService = new UserService(this.db);
  avaliacaoService = new AvaliacaoService(this.db);

  async createComentario(createComentarioDto: CreateComentarioDto) {
    const userExists = await this.userService.findUserById(
      createComentarioDto.idusuario,
    );
    if (!userExists) {
      throw new ConflictException('Não existe usuário com esse email');
    }
    const avaliacaoExists = await this.avaliacaoService.findAvaliacaoById(
      createComentarioDto.idavaliacao,
    );
    if (!avaliacaoExists) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    const result = await this.db.query(
      'INSERT INTO comentario (texto, data, idavaliacao, idusuario) VALUES ($1, $2, $3, $4)',
      [
        createComentarioDto.texto,
        createComentarioDto.data,
        createComentarioDto.idavaliacao,
        createComentarioDto.idusuario,
      ],
    );
    return { message: "Comentário criado com sucesso!" };
  }

  async findAll() {
    const result = await this.db.query('SELECT * FROM comentario');
    return result.rows as Comentario[];
  }

  async findOne(id: number) {
    const result = await this.db.query(
      'SELECT * FROM comentario WHERE id = $1',
      [id],
    );
    if (result.rows.length === 0) {
      throw new NotFoundException('Comentário não encontrado');
    }
    return result.rows[0] as Comentario;
  }

  async updateComentario(id: number, updateComentarioDto: UpdateComentarioDto) {
    const comentario = await this.findOne(id);

    const updatedComentario = {
      ...comentario,
      ...updateComentarioDto,
    };

    const userExists = await this.userService.findUserById(
      updatedComentario.idusuario,
    );
    if (!userExists) {
      throw new ConflictException('Não existe usuário com esse email');
    }
    const avaliacaoExists = await this.avaliacaoService.findAvaliacaoById(
      updatedComentario.idavaliacao,
    );
    if (!avaliacaoExists) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    const result = await this.db.query(
      'UPDATE comentario SET texto = $1, data = $2, idavaliacao = $3, idusuario = $4 WHERE id = $5',
      [
        updatedComentario.texto,
        updatedComentario.data,
        updatedComentario.idavaliacao,
        updatedComentario.idusuario,
        id,
      ],
    );
    return { message: "Comentário atualizado com sucesso!" };
  }

  async deleteComentario(id: number) {
    const result = await this.db.query(
      'DELETE FROM comentario WHERE id = $1',
      [id],
    );
    if (result.rows.length === 0) {
      throw new NotFoundException('Comentário não encontrado');
    }
    return result.rows[0];
  }

  async findComentariosFromAvaliacao(idAvaliacao: number,): Promise<Comentario[]> {
    const result = await this.db.query(
      'SELECT * FROM comentario WHERE idavaliacao = $1',
      [idAvaliacao],
    );
    return result.rows as Comentario[];
  }
}
