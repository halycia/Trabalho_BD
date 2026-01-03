import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './user.entity';
import { Public } from '../auth/decorators/isPublic.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserPayload } from '../auth/types/UserPayload';
import {
  CreateUserDocs,
  GetAllUsersDocs,
  GetUserByEmailDocs,
  GetUserByUsernameDocs,
  GetUserByIdDocs,
  UpdateUserDocs,
  DeleteUserDocs,
} from './user.swagger';

@ApiTags('Usuários')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @CreateUserDocs()
  @Public()
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @GetAllUsersDocs()
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @GetUserByEmailDocs()
  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findUserByEmail(email);
  }

  @GetUserByUsernameDocs()
  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findUserByUsername(username);
  }

  @GetUserByIdDocs()
  @Get('profile')
  async getCurrentUserProfile(@CurrentUser() currentUser: UserPayload): Promise<User> {
    return this.userService.findUserById(parseInt(currentUser.sub));
  }

  @GetUserByIdDocs()
  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @UpdateUserDocs()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    if (id !== parseInt(currentUser.sub)) {
      throw new ForbiddenException('Você só pode atualizar seu próprio perfil');
    }
    return this.userService.updateUser(id, dto);
  }

  @DeleteUserDocs()
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    if (id !== parseInt(currentUser.sub)) {
      throw new ForbiddenException('Você só pode deletar sua própria conta');
    }
    return this.userService.deleteUser(id);
  }
}
