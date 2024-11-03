import { TodoRepository } from '../application/todo.repository-interface';
import { Injectable } from '@nestjs/common';
import { TodoItem } from '../domain/TodoItem';

@Injectable()
export class TodoInMemoryRepository implements TodoRepository {
  private items: TodoItem[] = [
    new TodoItem('Wake Up', 1),
    new TodoItem('Make a Tea', 5),
    new TodoItem('Stay awake', 2),
  ];

  create(item: TodoItem): Promise<void> {
    this.items.push(item);
    return Promise.resolve();
  }

  find(id: number): Promise<TodoItem | null> {
    if (!this.items[id]) {
      return Promise.resolve(null);
    }
    return Promise.resolve(this.items[id]);
  }

  getAll(): Promise<TodoItem[]> {
    return Promise.resolve(this.items);
  }

  async delete(id: number): Promise<TodoItem | null> {
    if (!this.items[id]) {
      return Promise.resolve(null);
    }
    const [deletedItem] = this.items.splice(id, 1);

    return new Promise((r) => setTimeout(r, 100, deletedItem));
  }
}
