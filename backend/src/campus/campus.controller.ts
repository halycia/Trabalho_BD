import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';
import { CampusService } from './campus.service';
import { Campus } from './campus.entity';
import { Public } from '../auth/decorators/isPublic.decorator';
import {
  GetAllCampusDocs,
  GetCampusByIdDocs,
} from './campus.swagger';
@ApiTags('Campus')
@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) { }

  @GetAllCampusDocs()
  @Public()
  @Get()
  async findAll(): Promise<Campus[]> {
    return await this.campusService.findAllCampus();
  }

  @GetCampusByIdDocs()
  @Public()
  @Get(':id')
  async findOneCampus(@Param('id', ParseIntPipe) idCampus: number): Promise<Campus | null> {
    return this.campusService.findOneCampus(idCampus);
  }
}
