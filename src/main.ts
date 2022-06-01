import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CONFIG } from './config';
import { AppModule } from './modules/app.module';

export const bootstrap = async (): Promise<NestExpressApplication> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    abortOnError: false,
    logger: false,
    cors: true
  });

  if (CONFIG.APP.ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');

    const swaggerOptions = new DocumentBuilder()
      .setTitle('Sample')
      .setVersion('1.0')
      .setDescription('Sample API documentation')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('docs', app, document);
  }

  app.disable('x-powered-by');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  return app;
}

if (require.main === module) {
  (async () => {
    try {
      const app = await bootstrap();
      
      await app.listen(CONFIG.APP.PORT);
      console.log(
        `Server started sucessfuly and is listening on port ${CONFIG.APP.PORT}`,
      );
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
