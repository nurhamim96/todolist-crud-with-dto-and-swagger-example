import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { TodoDTO } from 'src/dtos/todo.dto';
import { Todo } from 'src/models/todo.entity';
import { TodoService } from '../service/todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){}

    @Post()
    async create(@Body() todo: TodoDTO): Promise<Todo> {
        return this.todoService.create(todo);
    }

    @Get(':id')
    async findOne(@Param()params): Promise<Todo> {
        return this.todoService.findById(params.id);
    }

    @Get()
    async findAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body() todo: TodoDTO): Promise<any> {
        return this.todoService.update(id, todo);
    }

    @Delete(':id')
    async delete(@Param('id')id: number): Promise<any> {
        return this.todoService.delete(id);
    }

}
