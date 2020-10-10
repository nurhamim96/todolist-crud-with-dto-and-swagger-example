import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo } from './models/todo.entity';
import { TodoModule } from './api/todo/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'',
    database:'db_todo',
    entities:[Todo],
    synchronize:true,
    logging:true
  }), TodoModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
