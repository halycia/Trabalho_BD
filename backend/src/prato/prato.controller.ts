import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PratoService } from './prato.service';
import { Prato } from './prato.entity';
import { infoPrato } from './infoPrato.entity'
import { Public } from '../auth/decorators/isPublic.decorator';
import {
  GetAllPratosDocs,
  GetPratoByIdDocs,
  GetInfoPratosDocs,
  GetInfoPratoByIdDocs
} from './prato.swagger';

@ApiTags('Pratos')
@Controller('prato')
export class PratoController {
  constructor(private readonly pratoService: PratoService) { }
  @GetAllPratosDocs()
  @Public() 
  @Get()
  async findAll(): Promise<Prato[]> {
    return await this.pratoService.findAllPratos();
  }

  @GetInfoPratosDocs()
  @Public()
  @Get('info')
  async findInfoPrato(): Promise<infoPrato[]> {
    return this.pratoService.findInfoPrato();
  }

  @GetInfoPratoByIdDocs()
  @Public()
  @Get('info/:id')
  async findAllInfoPratoById(@Param('id', ParseIntPipe) idPrato: number): Promise<infoPrato | null> {
    return this.pratoService.findInfoPratoById(idPrato);
  }

  @GetPratoByIdDocs()
  @Public() 
  @Get(':id')
  async findOnePrato(@Param('id', ParseIntPipe) idPrato: number): Promise<Prato | null> {
    return this.pratoService.findOnePrato(idPrato);
  }


}
