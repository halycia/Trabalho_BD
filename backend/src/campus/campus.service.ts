import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Campus } from './campus.entity'; 
@Injectable()
export class CampusService {
  constructor(private db: DatabaseService) {}

  async findOneCampus(idCampus:number): Promise<Campus> {
    const result = await this.db.query(
      'SELECT * FROM campus WHERE id = $1',
      [idCampus],
    );
    const campus_found = result.rows[0];
    if (!campus_found) {
      throw new NotFoundException(`Campus com id ${idCampus} não encontrado`);
    }
    return campus_found as Campus;
  }
    async findAllCampus(): Promise<Campus[]> {
    const result = await this.db.query('SELECT * FROM campus');
    return result.rows as Campus[];
  }
}
