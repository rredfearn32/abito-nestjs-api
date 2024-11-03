import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import {
  TodoRepository,
  TodoRepositoryToken,
} from './todo.repository-interface';
import { TodoItem } from '../domain/TodoItem';
import { TodoItemNotFoundException } from '../domain/TodoItemNotFoundException';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepositoryMock: jest.Mocked<TodoRepository>;

  beforeEach(async () => {
    todoRepositoryMock = {
      create: jest.fn(),
      getAll: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: TodoRepositoryToken,
          useValue: todoRepositoryMock,
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
  });

  describe('findTodoItem', () => {
    it('returns the requested item', async () => {
      todoRepositoryMock.find.mockResolvedValue(new TodoItem('test', 1));

      const item = await todoService.findTodoItem(0);

      expect(item.title).toBe('test');
    });

    it('throws a TodoItemNotFoundException if not found', async () => {
      todoRepositoryMock.find.mockResolvedValue(null);

      await expect(todoService.findTodoItem(0)).rejects.toEqual(
        new TodoItemNotFoundException(),
      );
    });
  });
});
