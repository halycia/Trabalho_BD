import {
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prato } from './prato.entity'; 
import { infoPrato } from './infoPrato.entity';
@Injectable()
export class PratoService {
  constructor(private db: DatabaseService) {}

  async findOnePrato(id:number): Promise<Prato | null> {
    const result = await this.db.query(
      'SELECT * FROM prato WHERE id = $1',
      [id],
    );
    return result.rows[0] as Prato ?? null;
  }
    async findAllPratos(): Promise<Prato[]> {
    const result = await this.db.query('SELECT * FROM prato');
    return result.rows as Prato[];
  }

  async findInfoPrato(): Promise<infoPrato[]>{
    const result = await this.db.query('SELECT * FROM media_prato');
    return result.rows as infoPrato[];
  }
}
