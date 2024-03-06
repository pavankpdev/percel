// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').configDotenv();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe()); // This line is crucial
  await app.listen(3002, '0.0.0.0');
}
bootstrap();
