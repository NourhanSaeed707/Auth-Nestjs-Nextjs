import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //to go to validtion layer before function.
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(8800);
}
bootstrap();
