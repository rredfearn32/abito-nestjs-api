import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  TodoRepository,
  TodoRepositoryToken,
} from '../application/todo.repository-interface';
import { TodoItem } from '../domain/TodoItem';

describe('Cats', () => {
  let app: NestExpressApplication;
  let todoRepository: TodoRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    todoRepository = moduleRef.get<TodoRepository>(TodoRepositoryToken);

    await todoRepository.delete(0);
    await todoRepository.delete(0);
    await todoRepository.delete(0);

    await app.init();
  });

  describe('GET /todos', () => {
    it(`responds with code 200 and empty array`, () => {
      return request(app.getHttpServer()).get('/todos').expect(200).expect([]);
    });
    it(`responds with code 200 and two entries`, async () => {
      await todoRepository.create(new TodoItem('Item 1', 1));
      await todoRepository.create(new TodoItem('Item 2', 2));
      return request(app.getHttpServer())
        .get('/todos')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual([
            expect.objectContaining({ title: 'Item 1', importance: 1 }),
            expect.objectContaining({ title: 'Item 2', importance: 2 }),
          ]);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
