import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CampusService } from './campus.service';
import { Campus } from './campus.entity'; 

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

@Get()
async findAll() : Promise<Campus[]> {
    return await this.campusService.findAllCampus();
}

@Get(':id')
  async findOneCampus(@Param('id',ParseIntPipe) id: number): Promise<Campus | null> {
    return this.campusService.findOneCampus(id);
  }

}
