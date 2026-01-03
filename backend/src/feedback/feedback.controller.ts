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
import { ApiTags } from '@nestjs/swagger';
import { CreateFeedbackDto } from './dto/CreateFeedbackDto';
import { UpdateFeedbackDto } from './dto/UpdateFeedbackDto';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';
import {
  CreateFeedbackDocs,
  GetAllFeedbacksDocs,
  GetFeedbacksByUserDocs,
  GetFeedbackByIdDocs,
  UpdateFeedbackDocs,
  DeleteFeedbackDocs,
} from './feedback.swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserPayload } from '../auth/types/UserPayload';
import { Public } from 'src/auth/decorators/isPublic.decorator';
@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @CreateFeedbackDocs()
  @Post()
  async create(
    @Body() newFeedback: CreateFeedbackDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.feedbackService.createFeedback(newFeedback, parseInt(currentUser.sub));
  }

  @GetAllFeedbacksDocs()
  @Public()
  @Get()
  async findAllFeedbacks(): Promise<Feedback[]> {
    return this.feedbackService.findAllFeedbacks();
  }

  @GetFeedbacksByUserDocs()
  @Public()
  @Get('user/:idusuario')
  async findFeedbacksFromUser(@Param('idusuario', ParseIntPipe) idUsuario: number): Promise<Feedback[]> {
    return await this.feedbackService.findAllFeedbacksFromUser(idUsuario);
  }

  @GetFeedbackByIdDocs()
  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) idFeedback: number): Promise<Feedback> {
    return this.feedbackService.findOne(idFeedback);
  }

  @UpdateFeedbackDocs()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idFeedback: number,
    @Body() editedFeedback: UpdateFeedbackDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.feedbackService.updateFeedback(idFeedback, editedFeedback, parseInt(currentUser.sub));
  }

  @DeleteFeedbackDocs()
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) idFeedback: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.feedbackService.deleteFeedback(idFeedback, parseInt(currentUser.sub));
  }
}