import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Setor } from './setor.entity';
import { CampusService } from 'src/campus/campus.service';
@Injectable()
export class SetorService {
  constructor(private db: DatabaseService  ) { }
  campusService: CampusService = new CampusService(this.db);
  async findSetorById(idSetor: number): Promise<Setor> {
    const result = await this.db.query(
      'SELECT * FROM setor WHERE id = $1',
      [idSetor],
    );
    const setor_found = result.rows[0];
    if (!setor_found) {
      throw new NotFoundException(`Setor com id ${idSetor} não encontrado`);
    }
    return setor_found as Setor;
  }
  async findAllSetores(): Promise<Setor[]> {
    const result = await this.db.query('SELECT * FROM setor');
    return result.rows as Setor[];
  }
  async findSetoresByCampus(idCampus: number): Promise<Setor[]> {
    await this.campusService.findOneCampus(idCampus);
    const result = await this.db.query(
      'SELECT * FROM setor WHERE id_campus = $1',
      [idCampus],
    );
    return result.rows as Setor[];
  }
}
