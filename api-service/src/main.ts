// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').configDotenv();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // This line is crucial
  await app.listen(3000);
}
bootstrap();
