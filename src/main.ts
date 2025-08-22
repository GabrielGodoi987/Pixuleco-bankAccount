import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { UserModule } from './business-modules/user/user.module';
import { AccountModule } from './business-modules/account/account.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './business-modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Pixuleco api')
    .setDescription(
      'Project Destinated to learn raw SQL queries, process Queues and master tools daily used',
    )
    .addTag('Pixuleco')
    .setVersion('1.2.0.1')
    .build();

  const documentOptions: SwaggerDocumentOptions = {
    include: [UserModule, AccountModule, AuthModule],
    deepScanRoutes: true,
    autoTagControllers: true,
  };

  const document = SwaggerModule.createDocument(app, config, documentOptions);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
