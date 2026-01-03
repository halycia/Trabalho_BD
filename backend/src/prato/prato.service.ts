import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prato } from './prato.entity';
import { infoPrato } from './infoPrato.entity';
@Injectable()
export class PratoService {
  constructor(private db: DatabaseService) { }

  async findOnePrato(idPrato: number): Promise<Prato> {
    const result = await this.db.query(
      'SELECT * FROM prato WHERE id = $1',
      [idPrato],
    );
    const prato_found = result.rows[0];
    if (!prato_found) {
      throw new NotFoundException(`Prato com id ${idPrato} não encontrado`);
    }
    return prato_found as Prato;
  }
  async findAllPratos(): Promise<Prato[]> {
    const result = await this.db.query('SELECT * FROM prato');
    return result.rows.map(prato => ({
      ...prato,
      icone: prato.icone ? prato.icone.toString('base64') : null,
    }));
  }

  async findInfoPrato(): Promise<infoPrato[]> {
    const result = await this.db.query('SELECT * FROM media_prato');
     return result.rows.map(prato => ({
      ...prato,
      icone: prato.icone ? prato.icone.toString('base64') : null,
    }));
  }
  async findInfoPratoById(id: number): Promise<infoPrato> {
    const result = await this.db.query(
      'SELECT * FROM media_prato WHERE id = $1',
      [id],
    );
    const prato = result.rows[0];
    if (!prato) {
      throw new NotFoundException(`Prato com id ${id} não encontrado`);
    }
    return {
    ...prato,
    icone: prato.icone ? prato.icone.toString('base64') : null,
    } as infoPrato;
  }

async findAllInfoPratoById(idPrato: number): Promise<infoPrato> {
  const result = await this.db.query(
    `
    SELECT 
      p.id,
      p.nome,
      p.icone,
      COUNT(a.id) AS qtd_avaliacoes,
      AVG(a.nota) AS media_avaliacoes,
      (
        SELECT COUNT(*) 
        FROM cardapio_prato cp 
        WHERE cp.id_prato = p.id
      ) AS qtd_cardapios
    FROM prato p
    LEFT JOIN avaliacao a ON a.id_prato = p.id
    WHERE p.id = $1
    GROUP BY p.id, p.nome, p.icone
    `,
    [idPrato],
  );

  const prato = result.rows[0];
  if (!prato) {
    throw new NotFoundException(`Prato com id ${idPrato} não encontrado`);
  }
  return prato;
}
}
