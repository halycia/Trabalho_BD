import { DatabaseService } from '../database/database.service';
import { Setor } from './setor.entity';
export declare class SetorService {
    private db;
    constructor(db: DatabaseService);
    findOneSetor(id: number): Promise<Setor | null>;
    findAllSetores(): Promise<Setor[]>;
}
