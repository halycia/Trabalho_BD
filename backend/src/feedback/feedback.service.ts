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

    async findAllFeedbcksFromUser(email: string): Promise<Feedback[]> {
        const result = await this.db.query(
            'SELECT * FROM feedback WHERE emailUsuario = $1',
            [email],
        );
        return result.rows as Feedback[];
    }

    async createFeedback(newFeedback: CreateFeedbackDto) {
        const userExists = await this.userService.findUserByEmail(newFeedback.emailusuario);
        const setorExists = await this.setorService.findOneSetor(newFeedback.idsetor);
        if (!userExists) {
        throw new ConflictException('Não existe usuário com esse email');
        }
        else if (!setorExists) {
        throw new NotFoundException('Setor não encontrado');
        }
        else{
            const result = await this.db.query(
                `INSERT INTO feedback (data, texto, tipo, idSetor, emailUsuario)
                VALUES ($1, $2, $3, $4, $5)`,
                [newFeedback.data, newFeedback.texto, newFeedback.tipo,
                newFeedback.idsetor, newFeedback.emailusuario],
            );
            return { message: 'Feedback criado com sucesso' };
        } 
    }

    async updateFeedback(id: number, editedFeedback: UpdateFeedbackDto) {
        const feedbackExists = await this.findOne(id);
        if (!feedbackExists) {
            throw new NotFoundException('Feedback não encontrado');
        }
        const userExists = await this.userService.findUserByEmail(editedFeedback.emailusuario);
        const setorExists = await this.setorService.findOneSetor(editedFeedback.idsetor);
        if (!userExists) {
            throw new ConflictException('Não existe usuário com esse email');
        }
        else if (!setorExists) {
            throw new NotFoundException('Setor não encontrado');
        }
        else{
            const result = await this.db.query(
                `UPDATE feedback SET data = $1, texto = $2, tipo = $3, idSetor = $4, emailUsuario = $5
                WHERE id = $6`,
                [editedFeedback.data, editedFeedback.texto, editedFeedback.tipo,
                editedFeedback.idsetor, editedFeedback.emailusuario, id],
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
