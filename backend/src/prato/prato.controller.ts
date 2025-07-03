import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { PratoService } from './prato.service';
import { Prato } from './prato.entity'; 
import{infoPrato} from './infoPrato.entity'

@Controller('prato')
export class PratoController {
  constructor(private readonly pratoService: PratoService) {}

@Get()
async findAll() : Promise<Prato[]> {
    return await this.pratoService.findAllPratos();
}

@Get(':id')
  async findOnePrato(@Param('id') id:number): Promise<Prato | null> {
    return this.pratoService.findOnePrato(id);
  }


@Get('info')
  async findInfoPrato(): Promise<infoPrato[]>{
    return this.pratoService.findInfoPrato();
  }
}
