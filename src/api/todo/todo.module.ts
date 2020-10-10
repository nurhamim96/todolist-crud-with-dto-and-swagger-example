import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/models/todo.entity';
import { TodoController } from './controller/todo.controller';
import { TodoService } from './service/todo.service';


@Module({
  imports:[TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
