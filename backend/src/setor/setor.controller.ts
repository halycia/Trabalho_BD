import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SetorService } from './setor.service';
import { Setor } from './setor.entity'; 

@Controller('setor')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

@Get()
async findAll() : Promise<Setor[]> {
    return await this.setorService.findAllSetores();
}

@Get('id')
  async findOneSetor(@Param('id', ParseIntPipe) id: number): Promise<Setor | null> {
    return this.setorService.findOneSetor(id);
  }

}
