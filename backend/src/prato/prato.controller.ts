import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PratoService } from './prato.service';
import { Prato } from './prato.entity';
import { infoPrato } from './infoPrato.entity'
import { Public } from '../auth/decorators/isPublic.decorator';
import { AuthGuard } from '../auth/auth.guard';
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

  @Public() 
  @Get()
  async findAll(): Promise<Prato[]> {
    return await this.pratoService.findAllPratos();
  }

  @GetInfoPratosDocs()
  @Public()
  @Get('info')
  async findInfoPrato(): Promise<infoPrato[]> {
    console.log('Chamando findInfoPrato no PratoController');
    return this.pratoService.findInfoPrato();
  }

  @GetInfoPratoByIdDocs()
  @Public()
  @Get('info/:id')
  async findAllInfoPratoById(@Param('id', ParseIntPipe) id: number): Promise<infoPrato | null> {
    console.log('Chamando findInfoPratoById no PratoController com id:', id);
    return this.pratoService.findInfoPratoById(id);
  }

  @GetPratoByIdDocs()
  @GetPratoByIdDocs()
  @Public() 
  @Get(':id')
  async findOnePrato(@Param('id', ParseIntPipe) id: number): Promise<Prato | null> {
    return this.pratoService.findOnePrato(id);
  }


}
