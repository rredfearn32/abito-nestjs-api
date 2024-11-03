import { TodoItem } from '../domain/TodoItem';

export interface TodoRepository {
  create(item: TodoItem): Promise<void>;

  getAll(): Promise<TodoItem[]>;

  find(id: number): Promise<TodoItem | null>;

  delete(id: number): Promise<TodoItem | null>;
}

export const TodoRepositoryToken = Symbol('TodoRepository');
