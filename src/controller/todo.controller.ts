import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from '../application/todo.service';
import { CreateTodoDto } from './CreateTodo.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TodoItem } from '../domain/TodoItem';

@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiQuery({
    name: 'importance',
    description: 'Filter Results by importance',
    required: false,
    type: Number,
  })
  @Get()
  async getAllTodos(
    @Query('importance') importance?: number,
  ): Promise<TodoItem[]> {
    const items = await this.todoService.getAll();

    return items;
  }

  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Todo not found' })
  @Get(':id')
  async getTodo(@Param('id') id: number) {
    const item = await this.todoService.findTodoItem(id);

    return item;
  }

  @Post()
  async createTodo(@Body() { title, importance }: CreateTodoDto) {
    await this.todoService.createTodoItem(title, importance);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    await this.todoService.deleteTodoItem(id);
  }
}
