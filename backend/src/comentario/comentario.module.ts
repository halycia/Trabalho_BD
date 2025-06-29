import { Module } from '@nestjs/common';
import { ComentarioController } from './comentario.controller';
import { ComentarioService } from './comentario.service';
import { DatabaseService } from '../database/database.service';
import { AvaliacaoService } from '../avaliacao/avaliacao.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ComentarioController],
  providers: [ComentarioService, DatabaseService, AvaliacaoService, UserService],
  exports: [ComentarioService],
})
export class ComentarioModule {}