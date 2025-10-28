// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (so your frontend or Postman can call APIs)
  app.enableCors();

  // Enable validation and clean DTO handling
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT ?? 4000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
