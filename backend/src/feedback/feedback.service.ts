import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserService } from 'src/user/user.service';
import { SetorService } from 'src/setor/setor.service';
import { CreateFeedbackDto } from './dto/CreateFeedbackDto';
import { UpdateFeedbackDto } from './dto/UpdateFeedbackDto';
import { Feedback } from './feedback.entity'; 
@Injectable()
export class FeedbackService {
  constructor(private db: DatabaseService) {}
    userService = new UserService(this.db);
    setorService = new SetorService(this.db);

  async findOne(id: number): Promise<Feedback | null> {
    const result = await this.db.query(
      'SELECT * FROM feedback WHERE id = $1',
      [id],
    );
    return result.rows[0] as Feedback ?? null;
  }
  async findAllFeedbacks(): Promise<Feedback[]> {
    const result = await this.db.query('SELECT * FROM feedback');
    return result.rows as Feedback[];
  }
  
    async findAllFeedbacksFromUser(id: number): Promise<Feedback[]> {
        const result = await this.db.query(
            'SELECT * FROM feedback WHERE idUsuario = $1',
            [id],
        );
        return result.rows as Feedback[];
    }

    async createFeedback(newFeedback: CreateFeedbackDto) {
        const userExists = await this.userService.findUserById(newFeedback.idusuario);
        const setorExists = await this.setorService.findOneSetor(newFeedback.idsetor);
        if (!userExists) {
        throw new ConflictException('Não existe usuário com esse email');
        }
        else if (!setorExists) {
        throw new NotFoundException('Setor não encontrado');
        }
        else{
            const result = await this.db.query(
                `INSERT INTO feedback (data, texto, tipo, idSetor, idUsuario)
                VALUES ($1, $2, $3, $4, $5)`,
                [newFeedback.data, newFeedback.texto, newFeedback.tipo,
                newFeedback.idsetor, newFeedback.idusuario],
            );
            return { message: 'Feedback criado com sucesso' };
        } 
    }

    async updateFeedback(id: number, editedFeedback: UpdateFeedbackDto) {
        const feedbackExists = await this.findOne(id);
        if (!feedbackExists) {
            throw new NotFoundException('Feedback não encontrado');
        }
        const userExists = await this.userService.findUserById(editedFeedback.idusuario);
        const setorExists = await this.setorService.findOneSetor(editedFeedback.idsetor);
        if (!userExists) {
            throw new ConflictException('Não existe usuário com esse email');
        }
        else if (!setorExists) {
            throw new NotFoundException('Setor não encontrado');
        }
        else{
            const result = await this.db.query(
                `UPDATE feedback SET data = $1, texto = $2, tipo = $3, idSetor = $4, idUsuario = $5
                WHERE id = $6`,
                [editedFeedback.data, editedFeedback.texto, editedFeedback.tipo,
                editedFeedback.idsetor, editedFeedback.idusuario, id],
            );
              return { message: 'Feedback editado com sucesso' };
        }
    }

    async deleteFeedback(id: number) {
            const result = await this.db.query(
      'DELETE FROM feedback WHERE id = $1',
      [id],
    );
    return { message: 'Feedback deletado com sucesso' };
    }
}
