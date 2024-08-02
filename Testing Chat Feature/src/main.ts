
import {
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { middleware as expressCtx } from 'express-ctx';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import * as express from 'express';
import * as cors from 'cors';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';
import * as dotenv from "dotenv";
dotenv.config({ path: `.env.test` });
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    // { cors: true, },
  );
  app.use(cors());
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const config = new DocumentBuilder()
    .setTitle('Task Runs ')
    .setDescription('The task runs API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  app.use(express.json({ limit: '50mb' }));

  app.set('trust proxy', 1); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(helmet());
  // app.setGlobalPrefix('/api'); use api as global prefix if you don't have subdomain
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe({}));
  const configService = app.select(ConfigurationModule).get(ConfigurationService);
  app.use(expressCtx);
  // Starts listening for shutdown hook
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }
  const port = configService.appConfig.port;
  await app.listen(port || 3000);
  console.info(`server running on ${await app.getUrl()}`);
  return app;
}
bootstrap();
// https://www.figma.com/design/4f2SPQVgzvKyYksyNIjadp/Task-Runs?node-id=0-1&t=o53f4oimuVOye0o6-0