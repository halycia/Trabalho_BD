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
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/CreateComentarioDto';
import { UpdateComentarioDto } from './dto/UpdateComentarioDto';
import { Comentario } from './comentario.entity';

@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  createComentario(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentarioService.createComentario(createComentarioDto);
  }

  @Get()
  findAll() {
    return this.comentarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number):Promise<Comentario> {
    return this.comentarioService.findOne(id);
  }

  @Get ('avaliacao/:idAvaliacao')
  findComentariosFromAvaliacao(
    @Param('idAvaliacao', ParseIntPipe) idAvaliacao: number,
  ): Promise<Comentario[]> {
    return this.comentarioService.  findComentariosFromAvaliacao(idAvaliacao);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComentarioDto: UpdateComentarioDto,
  ) {
    return this.comentarioService.updateComentario(id, updateComentarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comentarioService.deleteComentario(id);
  }
}
