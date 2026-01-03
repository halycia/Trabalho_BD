import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserService } from 'src/user/user.service';
import { SetorService } from 'src/setor/setor.service';
import { CreateFeedbackDto } from './dto/CreateFeedbackDto';
import { UpdateFeedbackDto } from './dto/UpdateFeedbackDto';
import { Feedback } from './feedback.entity';
@Injectable()
export class FeedbackService {
  constructor(private db: DatabaseService) { }
  userService = new UserService(this.db);
  setorService = new SetorService(this.db,);

  async findOne(idFeedback: number): Promise<Feedback> {
    const result = await this.db.query(
      'SELECT * FROM feedback WHERE id = $1',
      [idFeedback],
    );
    const feedback_found = result.rows[0];
    if (!feedback_found) {
      throw new NotFoundException(`Feedback com id ${idFeedback} não encontrado`);
    }
    return feedback_found as Feedback;
  }

  async findAllFeedbacks(): Promise<Feedback[]> {
    const result = await this.db.query('SELECT * FROM feedback');
    return result.rows as Feedback[];
  } 
  
  async findAllFeedbacksFromUser(idUsuario: number): Promise<Feedback[]> {
    await this.userService.findUserById(idUsuario);
    const result = await this.db.query(
      'SELECT * FROM feedback WHERE id_usuario = $1',
      [idUsuario],
    );
    return result.rows as Feedback[];
  }

  async createFeedback(newFeedback: CreateFeedbackDto, id_payload:number) {
    await this.userService.findUserById(newFeedback.id_usuario);
    await this.setorService.findSetorById(newFeedback.id_setor);    
    if (newFeedback.id_usuario !== id_payload) {
      throw new ForbiddenException('Você só pode criar feedback para si mesmo');
    }
    await this.db.query(
          `INSERT INTO Feedback (data, texto, tipo, id_setor, id_usuario)
            VALUES ($1, $2, $3, $4, $5)`,
          [
            newFeedback.data, 
            newFeedback.texto, 
            newFeedback.tipo,
            newFeedback.id_setor, 
            newFeedback.id_usuario
          ]
      );
    return { message: 'Feedback criado com sucesso' };
  }

  async updateFeedback(idFeedback: number, editedFeedback: UpdateFeedbackDto, id_payload:number) {
    await this.findOne(idFeedback);
    await this.userService.findUserById(editedFeedback.id_usuario);
    await this.setorService.findSetorById(editedFeedback.id_setor);
    if (editedFeedback.id_usuario !== id_payload) {
      throw new ForbiddenException('Você só pode editar seus próprios feedbacks');
    }
    await this.db.query(
      `UPDATE feedback SET data = $1, texto = $2, tipo = $3, id_setor = $4, id_usuario = $5
              WHERE id = $6`,
      [
        editedFeedback.data, 
        editedFeedback.texto, 
        editedFeedback.tipo,
        editedFeedback.id_setor, 
        editedFeedback.id_usuario, 
        idFeedback]
    );
    return { message: 'Feedback editado com sucesso' };
  }

  async deleteFeedback(idFeedback: number, id_payload:number) {
    const deletedFeedback = await this.findOne(idFeedback);    
    if (deletedFeedback.id_usuario !== id_payload) {
      throw new ForbiddenException('Você só pode deletar seus próprios feedbacks');
    }
    await this.db.query(
      'DELETE FROM feedback WHERE id = $1',
      [idFeedback],
    );
    return { message: 'Feedback deletado com sucesso' };
  }
}
