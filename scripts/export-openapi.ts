import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/modules/auth/auth.module';
import { GoalsModule } from '../src/modules/goals/goals.module';
import { CronModule } from '../src/modules/cron/cron.module';
import { UsersModule } from '../src/modules/users/users.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

async function exportOpenApi() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Abito API')
    .setDescription('An API for Abito.dev')
    .addBearerAuth({
      type: 'http',
      description:
        'The Token used to communicate directly with the underlying API',
    })
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, GoalsModule, UsersModule, CronModule],
  });

  const outputPath = path.resolve(process.cwd(), 'openapi.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  console.log(`OpenAPI spec written to ${outputPath}`);

  await app.close();
}

exportOpenApi();
