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
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post()
  async create(@Body() newFeedback: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(newFeedback);
  }

  @Get()
  async findAllFeedbacks(): Promise<Feedback[]> {
    return this.feedbackService.findAllFeedbacks();
  }

  @Get('user/:idusuario')
  async findFeedbacksFromUser(@Param('idusuario', ParseIntPipe) idusuario: number): Promise<Feedback[]> {
    return await this.feedbackService.findAllFeedbacksFromUser(idusuario);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Feedback | null> {
    return this.feedbackService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() editedFeedback: UpdateFeedbackDto,
  ) {
    return this.feedbackService.updateFeedback(id, editedFeedback);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.feedbackService.deleteFeedback(id);
  }
}
