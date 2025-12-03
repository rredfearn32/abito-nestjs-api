"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const express = require("express");
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/auth/auth.module");
const goals_module_1 = require("./modules/goals/goals.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use('/swagger-static', express.static((0, path_1.join)(__dirname, '../node_modules/swagger-ui-dist')));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Abito API')
        .setDescription('An API for Abito.dev')
        .addBearerAuth({
        type: 'http',
        description: 'The Token used to communicate directly with the underlying API',
    })
        .setVersion('0.1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        include: [auth_module_1.AuthModule, goals_module_1.GoalsModule],
    });
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
