import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { DatabaseService } from '../database/database.service'; 

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, DatabaseService],
  exports: [FeedbackService], 
})
export class FeedbackModule {}
