import {
    Injectable,
    InternalServerErrorException,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateAvaliacaoDto } from './dto/CreateAvaliacaoDto';
import { UpdateAvaliacaoDto } from './dto/UpdateAvaliacaoDto';
import { Avaliacao } from './avaliacao.entity';
import { UserService } from '../user/user.service';
import { PratoService } from '../prato/prato.service';
@Injectable()
export class AvaliacaoService {
    constructor(private db: DatabaseService) { }
    userService: UserService = new UserService(this.db);
    pratoService: PratoService = new PratoService(this.db);
    async findAvaliacaoById(id: number): Promise<Avaliacao> {
        const result = await this.db.query(
            'SELECT * FROM avaliacao WHERE id = $1',
            [id],
        );
        const avaliacao_found = result.rows[0];
        if (!avaliacao_found) {
            throw new NotFoundException(`Avaliação com id ${id} não encontrada`);
        }
        return avaliacao_found as Avaliacao;
    }

    async findAllAvaliacao(): Promise<Avaliacao[]> {
        const result = await this.db.query('SELECT * FROM avaliacao');
        return result.rows as Avaliacao[];
    }

    async findAvalsFromUser(id_usuario: number): Promise<Avaliacao[]> {
        await this.userService.findUserById(id_usuario);
        const result = await this.db.query(
            'SELECT * FROM avaliacao WHERE id_usuario = $1',
            [id_usuario],
        );
        return result.rows as Avaliacao[];
    }

    async findAvalsFromPrato(id_prato: number): Promise<Avaliacao[]> {
        await this.pratoService.findOnePrato(id_prato);
        const result = await this.db.query(
            'SELECT * FROM avaliacao WHERE id_prato = $1',
            [id_prato],
        );
        return result.rows as Avaliacao[];
    }

    async findAvalsFromPratoWithUserName(id_prato: number): Promise<Avaliacao[]> {
        const result = await this.db.query(
            'SELECT a.*, u.nome AS nome_usuario FROM avaliacao a JOIN usuario u ON a.id_usuario = u.id WHERE a.id_prato = $1',
            [id_prato],);
        return result.rows as Avaliacao[];
    }

    async createAvaliacao(newAvaliacao: CreateAvaliacaoDto) {
        await this.userService.findUserById(newAvaliacao.id_usuario);
        const result = await this.db.query(
                `INSERT INTO avaliacao (nota, data_avaliacao, data_consumo, texto, id_usuario, id_prato, refeicao)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                newAvaliacao.nota, 
                newAvaliacao.data_avaliacao, 
                newAvaliacao.data_consumo, 
                newAvaliacao.texto, 
                newAvaliacao.id_usuario, 
                newAvaliacao.id_prato, 
                newAvaliacao.refeicao
                ]);
        return result.rows[0];
    }

    async updateAvaliacao(id_avaliacao: number, avaliacao: UpdateAvaliacaoDto, userId:number) {
        await this.userService.findUserById(avaliacao.id_usuario);
        const updateAvaliacao = await this.findAvaliacaoById(id_avaliacao);
        if (updateAvaliacao.id_usuario!== userId) {
            throw new ForbiddenException('Você só pode atualizar suas próprias avaliações');
        }
        const result = await this.db.query(
            'UPDATE avaliacao SET nota = $1, texto = $2, data_consumo = $3, data_avaliacao = $4 WHERE id = $5', 
            [
            avaliacao.nota ?? updateAvaliacao.nota,
            avaliacao.texto ?? updateAvaliacao.texto,
            avaliacao.data_consumo ?? updateAvaliacao.data_consumo,
            avaliacao.data_avaliacao ?? updateAvaliacao.data_avaliacao,
            id_avaliacao
            ]
        );
        return {message: 'Avaliação atualizada com sucesso.'};
    }

    async deleteAvaliacao(id: number) {
        await this.findAvaliacaoById(id);
        await this.db.query('DELETE FROM avaliacao WHERE id = $1', [id]);
        return {
            message: 'Avaliação deletada com sucesso.'
        }
    }

}