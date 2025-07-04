import {
    Injectable,
    ConflictException,
    NotFoundException,
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

    async findAvalsFromUser(idusuario: number): Promise<Avaliacao[]> {
        const result = await this.db.query(
            'SELECT * FROM avaliacao WHERE idusuario = $1',
            [idusuario],
        );
        return result.rows as Avaliacao[];
    }

    async createAvaliacao(newAvaliacao: CreateAvaliacaoDto) {
        const result = await this.db.query(
            `INSERT INTO avaliacao (nota, dataavaliacao, dataconsumo, texto, idusuario, idprato, refeicao)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [newAvaliacao.nota, newAvaliacao.dataavaliacao, newAvaliacao.dataconsumo, newAvaliacao.texto, newAvaliacao.idusuario, newAvaliacao.idprato, newAvaliacao.refeicao]);
        return result.rows[0];
    }

    async updateAvaliacao(id: number, avaliacao: UpdateAvaliacaoDto) {
        try {
            const updateAvaliacao = await this.findAvaliacaoById(id);
            const result = await this.db.query(
                'UPDATE avaliacao SET nota = $1, texto = $2, dataconsumo = $3, dataavaliacao = $4 WHERE id = $5', [
                avaliacao.nota ?? updateAvaliacao.nota,
                avaliacao.texto ?? updateAvaliacao.texto,
                avaliacao.dataconsumo ?? updateAvaliacao.dataconsumo,
                avaliacao.dataavaliacao ?? updateAvaliacao.dataavaliacao,
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