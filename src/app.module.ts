import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/task.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database';

import config from './config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: '.env',
      validationSchema: Joi.object({
        DBHOST: Joi.string().required(),
        DBNAME: Joi.string().required(),
        DBUSER: Joi.string().required(),
        DBPASSWORD: Joi.string().required(),
      }),
    }),
    TaskModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
