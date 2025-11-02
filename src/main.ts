import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function start() {
  const PORT = process.env.PORT ?? 3030;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('FootballAcademy Project')
    .setDescription('NestJS RESTful API')
    .setVersion('1.0')
    .addTag('NestJS, AccessToken, RefreshToken, Cookie, SMS, BOT, Validation, Auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT);
  console.log(`✅ Swagger: http://localhost:${PORT}/api/docs`);
}

start();
