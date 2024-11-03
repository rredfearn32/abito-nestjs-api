import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
