import { SetorService } from './setor.service';
import { Setor } from './setor.entity';
export declare class SetorController {
    private readonly setorService;
    constructor(setorService: SetorService);
    findAll(): Promise<Setor[]>;
    findOneSetor(id: number): Promise<Setor | null>;
}
