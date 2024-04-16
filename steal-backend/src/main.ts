import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as MySQLStore from 'express-mysql-session';
import { getStoreOptions } from './common/helpers/database';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register(), {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  const MySQLStoreOptions: MySQLStore.Options = getStoreOptions();
  const MySQLSessionStore = MySQLStore(session);

  // Configure session middleware with MySQL session store
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MySQLSessionStore(MySQLStoreOptions),
    }),
  );

  // Configure validation
  app.useGlobalPipes(new ValidationPipe());

  // Configure Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Minathon March 2024 API')
    .setDescription('Please login to use the API.')
    .setVersion('1.0')
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    new Logger('Bootstrap').log(
      `Server is running on port ${port}, view API documentation at /api`,
    );
  });
}

bootstrap();
