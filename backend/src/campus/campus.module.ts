/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CampusController } from './campus.controller';
import { CampusService} from './campus.service';
import { DatabaseService } from '../database/database.service'; 

@Module({
  controllers: [CampusController],
  providers: [CampusService, DatabaseService],
  exports: [CampusService], 
})
export class CampusModule {}
