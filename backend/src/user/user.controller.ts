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
import { JwtService } from '@nestjs/jwt';
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
  GetCurrentUserProfileDocs,
} from './user.swagger';
import { parse } from 'path';

@ApiTags('Usuários')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  @CreateUserDocs()
  @Public()
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const result = await this.userService.createUser(dto);
    const token = this.jwtService.sign({ 
      sub: result.id.toString(), 
      username: result.username 
    });
    
    return {
      user: result,
      access_token: token
    };
  }

  @GetAllUsersDocs()
  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @GetUserByEmailDocs()
  @Public()
  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findUserByEmail(email);
  }

  @GetUserByUsernameDocs()
  @Public()
  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findUserByUsername(username);
  }

  @GetCurrentUserProfileDocs()
  @Get('perfil')
  async getCurrentUserProfile(@CurrentUser() currentUser: UserPayload): Promise<User> {
    return this.userService.findUserById(parseInt(currentUser.sub));
  }

  @GetUserByIdDocs()
  @Public()
  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @UpdateUserDocs()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idUsuario: number,
    @Body() updateDto: UpdateUserDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.userService.updateUser(idUsuario, updateDto, parseInt(currentUser.sub));
  }

  @DeleteUserDocs()
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) idUsuario: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.userService.deleteUser(idUsuario, parseInt(currentUser.sub));
  }
}