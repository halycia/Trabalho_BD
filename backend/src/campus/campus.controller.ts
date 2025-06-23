import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { CampusService } from './campus.service';
import { Campus } from './campus.entity'; 

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

@Get()
async findAll() : Promise<Campus[]> {
    return await this.campusService.findAllCampus();
}

@Get('nome/:nome')
  async findOneCampus(@Param('nome') nome: string): Promise<Campus | null> {
    return this.campusService.findOneCampus(nome);
  }

}
