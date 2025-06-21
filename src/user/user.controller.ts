import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

@Get()
async findAll(): Promise<User[]> {
  try {
    return await this.userService.findAllUsers();
  } catch (error) {
    console.error('Error in findAll:', error);
    throw error;
  }
}

@Get('email/:email') 
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.userService.findUserByEmail(email);
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<User | null> {
    return this.userService.findUserByUsername(username);
  }

  @Patch(':email')
  async update(
    @Param('email') email:string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(email, dto);
  }

  @Delete(':email')
  async delete(@Param('email') email:string) {
    return this.userService.deleteUser(email);
  }
}
