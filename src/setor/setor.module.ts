import { Module } from '@nestjs/common';
import { SetorController } from './setor.controller';
import { SetorService } from './setor.service';
import { DatabaseService } from '../database/database.service'; 

@Module({
  controllers: [SetorController],
  providers: [SetorService, DatabaseService],
  exports: [SetorService], 
})
export class UserModule {}
