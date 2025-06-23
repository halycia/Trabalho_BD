import { Module } from '@nestjs/common';
import { PratoController } from './prato.controller';
import { PratoService } from './prato.service';
import { DatabaseService } from '../database/database.service'; 

@Module({
  controllers: [PratoController],
  providers: [PratoService, DatabaseService],
  exports: [PratoService], 
})
export class PratoModule {}
