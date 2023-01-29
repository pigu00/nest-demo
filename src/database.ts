import { Module, Global } from '@nestjs/common';

import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg'

console.log(config.KEY);

@Global()
@Module({
  providers: [
    {
      provide: 'DB',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client ({
          host: configService.database.host,
          database: configService.database.database,
          user: configService.database.user,
          password: configService.database.password,
        })
        client.connect()
        return client
      },
      inject: [config.KEY],
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
