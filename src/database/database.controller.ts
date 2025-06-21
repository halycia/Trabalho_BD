import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('example')
export class ExampleController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async getData() {
    const result = await this.databaseService.query('SELECT * FROM your_table');
    return result.rows;
  }
}