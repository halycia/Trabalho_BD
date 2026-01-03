import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
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
    if (newFeedback.id_usuario !== parseInt(currentUser.sub)) {
      throw new ForbiddenException('Você só pode criar feedback para si mesmo');
    }
    return this.feedbackService.createFeedback(newFeedback);
  }

  @GetAllFeedbacksDocs()
  @Get()
  async findAllFeedbacks(): Promise<Feedback[]> {
    return this.feedbackService.findAllFeedbacks();
  }

  @GetFeedbacksByUserDocs()
  @Get('user/:idusuario')
  async findFeedbacksFromUser(@Param('idusuario', ParseIntPipe) idusuario: number): Promise<Feedback[]> {
    return await this.feedbackService.findAllFeedbacksFromUser(idusuario);
  }

  @GetFeedbackByIdDocs()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Feedback> {
    return this.feedbackService.findOne(id);
  }

  @UpdateFeedbackDocs()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editedFeedback: UpdateFeedbackDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const feedback = await this.feedbackService.findOne(id);
    if (!feedback) {
      throw new ForbiddenException('Feedback não encontrado');
    }
    if (feedback.id_usuario !== parseInt(currentUser.sub)) {
      throw new ForbiddenException('Você só pode editar seus próprios feedbacks');
    }
    return this.feedbackService.updateFeedback(id, editedFeedback);
  }

  @DeleteFeedbackDocs()
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const feedback = await this.feedbackService.findOne(id);
    if (!feedback) {
      throw new ForbiddenException('Feedback não encontrado');
    }
    if (feedback.id_usuario !== parseInt(currentUser.sub)) {
      throw new ForbiddenException('Você só pode deletar seus próprios feedbacks');
    }
    return this.feedbackService.deleteFeedback(id);
  }
}
