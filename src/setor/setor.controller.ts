import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SetorService } from './setor.service';

@Controller('setor')
export class SetorController {
  constructor(private readonly userService: SetorService) {}

@Get()
async findAll() {
    return await this.userService.findAllSetores();
}

@Get('id')
  async findOneSetor(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneSetor(id);
  }

}
