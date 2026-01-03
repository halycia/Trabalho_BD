import {
  ForbiddenException,
  Injectable,
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

  async createComentario(createComentarioDto: CreateComentarioDto, id_payload:number) {
    await this.userService.findUserById(createComentarioDto.id_usuario);    
    await this.avaliacaoService.findAvaliacaoById(createComentarioDto.id_avaliacao);
    if (createComentarioDto.id_usuario !== id_payload) {
      throw new ForbiddenException('Você só pode criar comentários para si mesmo');
    }
      await this.db.query(
      'INSERT INTO comentario (texto, data, id_avaliacao, id_usuario) VALUES ($1, $2, $3, $4)',
      [
        createComentarioDto.texto,
        createComentarioDto.data,
        createComentarioDto.id_avaliacao,
        createComentarioDto.id_usuario,
      ]
    );
    return { message: "Comentário criado com sucesso!" };
  }


  async findOne(idComentario: number) {
    const result = await this.db.query(
      'SELECT * FROM comentario WHERE id = $1',
      [idComentario],
    );
    if (result.rows[0] == null) {
      throw new NotFoundException('Comentário não encontrado');
    }
    return result.rows[0] as Comentario;
  }

  async findComentariosFromAvaliacao(idAvaliacao: number): Promise<Comentario[]> {
    const result = await this.db.query(
      'SELECT * FROM comentario WHERE id_avaliacao = $1',
      [idAvaliacao],
    );
    return result.rows as Comentario[];
  }

  async findAll() {
    const result = await this.db.query('SELECT * FROM comentario');
    return result.rows as Comentario[];
  }

  async updateComentario(idComentario: number, updateComentarioDto: UpdateComentarioDto, id_payload:number) {
    const comentario = await this.findOne(idComentario);
    const updatedComentario = {
      ...comentario,
      ...updateComentarioDto,
    };

    await this.userService.findUserById(updatedComentario.id_usuario);    
    await this.avaliacaoService.findAvaliacaoById(updatedComentario.id_avaliacao);
    if (updatedComentario.id_usuario !== id_payload) {
      throw new ForbiddenException('Você só pode atualizar comentários para si mesmo');
    }
    await this.db.query(
      'UPDATE comentario SET texto = $1, data = $2, id_avaliacao = $3, id_usuario = $4 WHERE id = $5',
      [
        updatedComentario.texto,
        updatedComentario.data,
        updatedComentario.id_avaliacao,
        updatedComentario.id_usuario,
        idComentario
      ],
    );
    return { message: "Comentário atualizado com sucesso!" };
  }

  async deleteComentario(idComentario: number, id_payload:number) {
    const comentario =  await this.findOne(idComentario);
    if (comentario.id_usuario !== id_payload) {
      throw new ForbiddenException('Você só pode deletar seus próprios comentários');
    }
    await this.db.query(
        'DELETE FROM comentario WHERE id = $1',
        [idComentario],
    );
    return {message:"Comentário excluído com sucesso!"};
  }
}
