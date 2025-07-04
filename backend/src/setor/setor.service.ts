import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Setor } from './setor.entity';
@Injectable()
export class SetorService {
  constructor(private db: DatabaseService) { }

  async findOneSetor(id: number): Promise<Setor | null> {
    const result = await this.db.query(
      'SELECT * FROM Setor WHERE id = $1',
      [id],
    );
    return result.rows[0] as Setor ?? null;
  }
  async findAllSetores(): Promise<Setor[]> {
    const result = await this.db.query('SELECT * FROM Setor');
    return result.rows as Setor[];
  }
  async findSetoresByCampus(idCampus: number): Promise<Setor[]> {
    const result = await this.db.query(
      'SELECT * FROM Setor WHERE id_campus = $1',
      [idCampus],
    );
    return result.rows as Setor[];
  }
}
