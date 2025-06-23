import { DatabaseService } from '../database/database.service';
import { Campus } from './campus.entity';
export declare class CampusService {
    private db;
    constructor(db: DatabaseService);
    findOneCampus(nome: string): Promise<Campus | null>;
    findAllCampus(): Promise<Campus[]>;
}
