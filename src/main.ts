import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './common/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions';


async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  //  validate class-validator and ignore non-whitelisted properties
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // catch all exceptions and return a custom error
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(env.port);


  logger.log(`Gateway running on port ${env.port}`);
}
bootstrap();