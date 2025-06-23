import { DatabaseService } from '../database/database.service';
import { Prato } from './prato.entity';
export declare class PratoService {
    private db;
    constructor(db: DatabaseService);
    findOnePrato(nome: string): Promise<Prato | null>;
    findAllPratos(): Promise<Prato[]>;
}
