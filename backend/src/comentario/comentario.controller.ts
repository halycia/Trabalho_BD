import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
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
import { AuthGuard } from '../auth/auth.guard';

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
    if (createComentarioDto.id_usuario !== parseInt(currentUser.sub)) {
      throw new ForbiddenException('Você só pode criar comentários para si mesmo');
    }
    return this.comentarioService.createComentario(createComentarioDto);
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
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Comentario> {
    return this.comentarioService.findOne(id);
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComentarioDto: UpdateComentarioDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const comentario = await this.comentarioService.findOne(id);
    if (!comentario) {
      throw new ForbiddenException('Comentário não encontrado');
    }
    if (comentario.id_usuario !== parseInt(currentUser.sub)) {
      throw new ForbiddenException('Você só pode editar seus próprios comentários');
    }
    return this.comentarioService.updateComentario(id, updateComentarioDto);
  }

  @DeleteComentarioDocs()
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const comentario = await this.comentarioService.findOne(id);
    if (!comentario) {
      throw new ForbiddenException('Comentário não encontrado');
    }
    if (comentario.id_usuario !== parseInt(currentUser.sub)) {
      throw new ForbiddenException('Você só pode deletar seus próprios comentários');
    }
    return this.comentarioService.deleteComentario(id);
  }
}
