import {
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Campus } from './campus.entity'; 
@Injectable()
export class CampusService {
  constructor(private db: DatabaseService) {}

  async findOneCampus(nome: string): Promise<Campus | null> {
    const result = await this.db.query(
      'SELECT * FROM campus WHERE nome = $1',
      [nome],
    );
    return result.rows[0] as Campus ?? null;
  }
    async findAllCampus(): Promise<Campus[]> {
    const result = await this.db.query('SELECT * FROM campus');
    return result.rows as Campus[];
  }
}
