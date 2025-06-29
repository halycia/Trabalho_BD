import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { TestController } from './database/database.controller';
import { UserModule } from './user/user.module';
import { SetorModule } from './setor/setor.module';
import { CampusModule } from './campus/campus.module';
import { PratoModule } from './prato/prato.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ComentarioModule } from './comentario/comentario.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule, UserModule, SetorModule, AvaliacaoModule, ComentarioModule, FeedbackModule, CampusModule, PratoModule, AuthModule],
  controllers: [AppController, TestController],
  providers: [AppService, DatabaseService],
})
export class AppModule { }
