import {
    Injectable,
    InternalServerErrorException,
    BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateAvaliacaoDto } from './dto/CreateAvaliacaoDto';
import { UpdateAvaliacaoDto } from './dto/UpdateAvaliacaoDto';
import { Avaliacao } from './avaliacao.entity';

@Injectable()
export class AvaliacaoService {
    constructor(private db: DatabaseService) { }

    async findAvaliacaoById(id: number): Promise<Avaliacao | null> {
        const result = await this.db.query(
            'SELECT * FROM avaliacao WHERE id = $1',
            [id],
        );
        return result.rows[0] as Avaliacao ?? null;
    }

    async findAllAvaliacao(): Promise<Avaliacao[]> {
        const result = await this.db.query('SELECT * FROM avaliacao');
        return result.rows as Avaliacao[];
    }

    async findAvalsFromUser(id_usuario: number): Promise<Avaliacao[]> {
        const result = await this.db.query(
            'SELECT * FROM avaliacao WHERE id_usuario = $1',
            [id_usuario],
        );
        return result.rows as Avaliacao[];
    }

    async createAvaliacao(newAvaliacao: CreateAvaliacaoDto) {
        const result = await this.db.query(
            `INSERT INTO avaliacao (nota, data_avaliacao, data_consumo, texto, id_usuario, id_prato, refeicao)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [newAvaliacao.nota, newAvaliacao.data_avaliacao, newAvaliacao.data_consumo, newAvaliacao.texto, newAvaliacao.id_usuario, newAvaliacao.id_prato, newAvaliacao.refeicao]);
        return result.rows[0];
    }

    async updateAvaliacao(id: number, avaliacao: UpdateAvaliacaoDto) {
        try {
            const updateAvaliacao = await this.findAvaliacaoById(id);
            const result = await this.db.query(
                'UPDATE avaliacao SET nota = $1, texto = $2, data_consumo = $3, data_avaliacao = $4 WHERE id = $5', [
                avaliacao.nota ?? updateAvaliacao.nota,
                avaliacao.texto ?? updateAvaliacao.texto,
                avaliacao.data_consumo ?? updateAvaliacao.data_consumo,
                avaliacao.data_avaliacao ?? updateAvaliacao.data_avaliacao,
                id
            ]
            );
            return result.rows[0];
        }
        catch (error: any) {
            throw new InternalServerErrorException('Atualização falhou');
        }
    }

    async deleteAvaliacao(id: number) {
        await this.db.query('DELETE FROM avaliacao WHERE id = $1', [id]);
        return {
            message: 'Avaliação deletada com sucesso.'
        }
    }

}