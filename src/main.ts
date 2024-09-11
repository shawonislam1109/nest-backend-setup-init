import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http/htttp.expection';
import { validationPipe } from './common/http/ValidationPipe';
import { RolesGuard } from './common/guard/guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);

  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new RolesGuard(new Reflector()));

  await app.listen(3000);
}
bootstrap();
