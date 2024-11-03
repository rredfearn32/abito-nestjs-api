import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TodoModule } from './todo.module';

@Module({
  imports: [LoggerModule.forRoot(), TodoModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
