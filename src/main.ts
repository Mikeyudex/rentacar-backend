import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import * as moment from 'moment';
import 'moment/locale/es';

import { AppModule } from './app.module';
import { MongooseValidationFilter } from './common/filters/mongoose-validation.filter';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { getAllowedOrigins } from './common/utils/cors-origin.utils';

config();
moment.locale('es');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new MongooseValidationFilter());
  /* app.useGlobalFilters(new AllExceptionsFilter()); */

  // Configurar CORS
  app.enableCors({
    origin: (origin: string, callback: Function) => {
      const allowedOrigins = getAllowedOrigins();
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('No permitido por CORS');
        callback(new Error('No permitido por CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });

  await app.listen(process.env.PORT ?? 4500);
}
bootstrap();
