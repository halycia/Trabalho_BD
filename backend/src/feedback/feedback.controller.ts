import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFeedbackDto } from './dto/CreateFeedbackDto';
import { UpdateFeedbackDto } from './dto/UpdateFeedbackDto';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

@Post()
  async create(@Body() newFeedback: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(newFeedback);
  }

@Get('user/:email')
async findFeedbacksFromUser(@Param('email',) email: string): Promise<Feedback[]> {
    return await this.feedbackService.findAllFeedbcksFromUser(email);
}

@Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number): Promise<Feedback | null> {
    return this.feedbackService.findOne(id);
  }

@Patch(':id')
  async update( @Param('id',ParseIntPipe) id:number,@Body() editedFeedback: UpdateFeedbackDto,
  ) {
    return this.feedbackService.updateFeedback(id, editedFeedback);
  }

  @Delete(':id')
  async delete(@Param('id',ParseIntPipe) id:number) {
    return this.feedbackService.deleteFeedback(id);
  }
}
