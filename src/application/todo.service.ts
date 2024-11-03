import { Inject, Injectable } from '@nestjs/common';
import {
  TodoRepository,
  TodoRepositoryToken,
} from './todo.repository-interface';
import { TodoItem } from '../domain/TodoItem';
import { TodoItemNotFoundException } from '../domain/TodoItemNotFoundException';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TodoRepositoryToken)
    private todoRepository: TodoRepository,
  ) {}

  async createTodoItem(title: string, importance: number) {
    const item = new TodoItem(title, importance);

    await this.todoRepository.create(item);
  }

  async getAll(): Promise<TodoItem[]> {
    const items = await this.todoRepository.getAll();

    return items;
  }

  async findTodoItem(id: number): Promise<TodoItem> {
    const item = await this.todoRepository.find(id);
    if (!item) {
      throw new TodoItemNotFoundException();
    }
    return item;
  }

  async deleteTodoItem(id: number) {
    const deletedItem = await this.todoRepository.delete(id);
    if (!deletedItem) {
      throw new TodoItemNotFoundException();
    }
  }
}
