import { CampusService } from './campus.service';
import { Campus } from './campus.entity';
export declare class CampusController {
    private readonly campusService;
    constructor(campusService: CampusService);
    findAll(): Promise<Campus[]>;
    findOneCampus(nome: string): Promise<Campus | null>;
}
