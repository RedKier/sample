import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@modules/app.module';
import { CONFIG } from '@config';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(CONFIG.APP.PORT);

  return app;
}

if (require.main === module) {
  (async () => {
    try {
      await bootstrap();
      console.log(
        `Server started sucessfuly and is listening on port ${CONFIG.APP.PORT}`,
      );
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
