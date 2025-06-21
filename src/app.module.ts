import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { TestController } from './database/database.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,}),
      DatabaseModule, UserModule],
  controllers: [AppController, TestController],
  providers: [AppService, DatabaseService],
})
export class AppModule { }
