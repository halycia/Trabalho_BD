import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/CreateAvaliacaoDto';
import { UpdateAvaliacaoDto } from './dto/UpdateAvaliacaoDto';
import { Avaliacao } from './avaliacao.entity';
import { Public } from '../auth/decorators/isPublic.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserPayload } from '../auth/types/UserPayload';
import {
  CreateAvaliacaoDocs,
  GetAllAvaliacoesDocs,
  GetAvaliacaoByIdDocs,
  GetAvaliacoesByUserDocs,
  GetAvaliacoesByPratoDocs,
  UpdateAvaliacaoDocs,
  DeleteAvaliacaoDocs,
} from './avaliacao.swagger';

@ApiTags('Avaliações')
@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) { }

  @CreateAvaliacaoDocs()
  @Post()
  async create(
    @Body() dto: CreateAvaliacaoDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.avaliacaoService.createAvaliacao(dto, parseInt(currentUser.sub));
  }

  @GetAllAvaliacoesDocs()
  @Public()
  @Get()
  async findAll(): Promise<Avaliacao[]> {
    return await this.avaliacaoService.findAllAvaliacao();
  }

  @GetAvaliacoesByUserDocs()
  @Public()
  @Get('user/:id')
  async findAvalsFromUser(@Param('id', ParseIntPipe) idUsuario: number): Promise<Avaliacao[]> {
    return this.avaliacaoService.findAvalsFromUser(idUsuario);
  }

  @GetAvaliacaoByIdDocs()
  @Public()
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Avaliacao | null> {
    return this.avaliacaoService.findAvaliacaoById(id);
  }

  @GetAvaliacoesByPratoDocs()
  @Public()
  @Get('prato/:id')
  async findAvalsFromPratoWithUserName(@Param('id', ParseIntPipe) idPrato: number): Promise<Avaliacao[]> {
    return this.avaliacaoService.findAvalsFromPratoWithUserName(idPrato);
  }

  @UpdateAvaliacaoDocs()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAvaliacaoDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.avaliacaoService.updateAvaliacao(id, dto, parseInt(currentUser.sub));
  }

  @DeleteAvaliacaoDocs()
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.avaliacaoService.deleteAvaliacao(id, parseInt(currentUser.sub));
  }
}