import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoDTO } from 'src/dtos/todo.dto';
import { Todo } from 'src/models/todo.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>
    ){}

    public async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    public async findById(id: number): Promise<Todo | null> {
        return await this.todoRepository.findOne({id});
    }

    async create(todo: TodoDTO): Promise<Todo> {
        return await this.todoRepository.save(todo);
    }

    async update(id: number, todoDTO: TodoDTO): Promise<Todo> {
        let todo: Todo = await this.todoRepository.findOne(id);

        if (!todo) throw new BadRequestException(`Todo with id: ${id} not found`);
        else {
            todo = this.todoRepository.merge(todo, todoDTO);
            return await this.todoRepository.save(todo);
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        const isExist: boolean = (await this.todoRepository.count({id})) > 0;
        if(!isExist) throw new NotFoundException(`Todo with id: ${id} not found`);
        else return await this.todoRepository.delete(id);
    }
}
