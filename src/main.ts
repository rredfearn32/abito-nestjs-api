import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve Swagger UI assets
  app.use(
    '/swagger-static',
    express.static(join(__dirname, '../node_modules/swagger-ui-dist')),
  );

  const config = new DocumentBuilder()
    .setTitle('Abito API')
    .setDescription('An API for Abito.dev')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Use static assets URL
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
