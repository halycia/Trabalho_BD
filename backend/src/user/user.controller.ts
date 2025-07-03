import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
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
    return await this.userService.findAllUsers();
}

@Get('email/:email') 
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.userService.findUserByEmail(email);
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<User | null> {
    return this.userService.findUserByUsername(username);
  }
@Get (':id')
async findUserById (@Param('id', ParseIntPipe) id:number) : Promise <User |null> {
  return this.userService.findUserById(id);
}

  @Patch(':id')
  async update(
    @Param('id',ParseIntPipe) id:number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id',ParseIntPipe) id:number) {
    return this.userService.deleteUser(id);
  }
}
