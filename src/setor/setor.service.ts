import { Injectable} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Setor } from './setor.entity'; 
@Injectable()
export class SetorService {
  constructor(private db: DatabaseService) {}

  async findOneSetor(id: number): Promise<Setor | null> {
    const result = await this.db.query(
      'SELECT * FROM setor WHERE id = $1',
      [id],
    );
    return result.rows[0] as Setor ?? null;
  }
    async findAllSetores(): Promise<Setor[]> {
    const result = await this.db.query('SELECT * FROM setor');
    return result.rows as Setor[];
  }
}
