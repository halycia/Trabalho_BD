import { PratoService } from './prato.service';
import { Prato } from './prato.entity';
export declare class PratoController {
    private readonly pratoService;
    constructor(pratoService: PratoService);
    findAll(): Promise<Prato[]>;
    findOnePrato(nome: string): Promise<Prato | null>;
}
