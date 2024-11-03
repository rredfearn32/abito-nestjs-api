import { Module } from '@nestjs/common';
import { TodoController } from './controller/todo.controller';
import { TodoService } from './application/todo.service';
import { TodoInMemoryRepository } from './infrastructure/todo.in-memory.repository';
import { TodoRepositoryToken } from './application/todo.repository-interface';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    {
      provide: TodoRepositoryToken,
      useClass: TodoInMemoryRepository,
    },
    TodoService,
  ],
  exports: [],
})
export class TodoModule {}
