import {
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Campus } from './campus.entity'; 
@Injectable()
export class CampusService {
  constructor(private db: DatabaseService) {}

  async findOneCampus(id:number): Promise<Campus | null> {
    const result = await this.db.query(
      'SELECT * FROM campus WHERE id = $1',
      [id],
    );
    return result.rows[0] as Campus ?? null;
  }
    async findAllCampus(): Promise<Campus[]> {
    const result = await this.db.query('SELECT * FROM campus');
    return result.rows as Campus[];
  }
}
