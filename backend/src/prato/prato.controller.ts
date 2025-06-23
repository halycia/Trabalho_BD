import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { PratoService } from './prato.service';
import { Prato } from './prato.entity'; 

@Controller('prato')
export class PratoController {
  constructor(private readonly pratoService: PratoService) {}

@Get()
async findAll() : Promise<Prato[]> {
    return await this.pratoService.findAllPratos();
}

@Get('nome/:nome')
  async findOnePrato(@Param('nome') nome: string): Promise<Prato | null> {
    return this.pratoService.findOnePrato(nome);
  }

}
