import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SetorService } from './setor.service';
import { Setor } from './setor.entity';
import { Public } from '../auth/decorators/isPublic.decorator';
import {
  GetAllSetoresDocs,
  GetSetorByIdDocs,
  GetSetoresByCampusDocs,
} from './setor.swagger';

@ApiTags('Setores')
@Controller('setor')
export class SetorController {
  constructor(private readonly setorService: SetorService) { }

  @GetAllSetoresDocs()
  @Public()
  @Get()
  async findAll(): Promise<Setor[]> {
    return await this.setorService.findAllSetores();
  }

  @GetSetorByIdDocs()
  @Public()
  @Get(':id')
  async findSetorById(@Param('id', ParseIntPipe) idSetor: number): Promise<Setor | null> {
    return this.setorService.findSetorById(idSetor);
  }

  @GetSetoresByCampusDocs()
  @Public()
  @Get('campus/:idCampus')
  async findSetoresByCampus(@Param('idCampus') idCampus: number): Promise<Setor[]> {
    return this.setorService.findSetoresByCampus(idCampus);
  }
}
