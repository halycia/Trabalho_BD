import { Module } from '@nestjs/common';
import { AvaliacaoController } from './avaliacao.controller';
import { AvaliacaoService } from './avaliacao.service';
import { DatabaseService } from '../database/database.service'; 

@Module({
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService, DatabaseService],
  exports: [AvaliacaoService], 
})
export class AvaliacaoModule {}
