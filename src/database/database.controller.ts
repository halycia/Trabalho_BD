import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('test')
export class TestController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async testConnection() {
    try {
      const result = await this.databaseService.query('SELECT NOW()');
      return { success: true, time: result.rows[0] };
    } catch (error) {
      return { success: false, message: 'Falha ao conectar', error };
    }
  }
}