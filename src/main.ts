// import { ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import serverlessExpress from '@vendia/serverless-express';

// import { Callback, Context, Handler } from 'aws-lambda';

// import { AppModule } from './app.module';

// let server: Handler;

// const bootstrap = async () => {
//   const app = await NestFactory.create(AppModule);

//   app.useGlobalPipes(new ValidationPipe());

//   await app.init();

//   const expressApp = app.getHttpAdapter().getInstance();

//   return serverlessExpress({ app: expressApp });
// };

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   server = server ?? (await bootstrap());

//   return server(event, context, callback);
// };
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  await app.listen(
    Number(process.env.APP_PORT) || 3001,
    process.env.APP_HOST || '0.0.0.0',
  );

  console.log(`Server running 🚀: ${await app.getUrl()}`);
})();
