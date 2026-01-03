import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/CreateComentarioDto';
import { UpdateComentarioDto } from './dto/UpdateComentarioDto';
import { Comentario } from './comentario.entity';
import { Public } from '../auth/decorators/isPublic.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserPayload } from '../auth/types/UserPayload';
import {
  CreateComentarioDocs,
  GetAllComentariosDocs,
  GetComentarioByIdDocs,
  GetComentariosByAvaliacaoDocs,
  UpdateComentarioDocs,
  DeleteComentarioDocs,
} from './comentario.swagger';
@ApiTags('Comentários')
@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) { }

  @CreateComentarioDocs()
  @Post()
  async createComentario(
    @Body() createComentarioDto: CreateComentarioDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.comentarioService.createComentario(createComentarioDto, parseInt(currentUser.sub));
  }

  @GetAllComentariosDocs()
  @Public()
  @Get()
  findAll() {
    return this.comentarioService.findAll();
  }

  @GetComentarioByIdDocs()
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) idComentario: number): Promise<Comentario> {
    return this.comentarioService.findOne(idComentario);
  }

  @GetComentariosByAvaliacaoDocs()
  @Public()
  @Get('avaliacao/:idAvaliacao')
  findComentariosFromAvaliacao(
    @Param('idAvaliacao', ParseIntPipe) idAvaliacao: number,
  ): Promise<Comentario[]> {
    return this.comentarioService.findComentariosFromAvaliacao(idAvaliacao);
  }

  @UpdateComentarioDocs()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idComentario:number,
    @Body() updateComentarioDto: UpdateComentarioDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
      return this.comentarioService.updateComentario(idComentario, updateComentarioDto, parseInt(currentUser.sub));
  }

  @DeleteComentarioDocs()
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) idComentario: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.comentarioService.deleteComentario(idComentario, parseInt(currentUser.sub));
  }
}
