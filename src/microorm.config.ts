import { join } from 'path';
import { Options } from '@mikro-orm/core';
import { CONFIG } from '@config';


const config: Options = {
  type: 'postgresql',
  host: CONFIG.DB.HOST,
  port: CONFIG.DB.PORT,
  user: CONFIG.DB.USERNAME,
  password: CONFIG.DB.PASSWORD,
  dbName: CONFIG.DB.DATABASE,
  entities: [`${__dirname}/**/*.entity.{js,ts}`],
  entitiesTs: [`${__dirname}/**/*.entity.{js,ts}`],
  driverOptions: {
    connection: {
      ssl: false,
    },
  },
  debug: false,
  migrations: {
    tableName: 'migrations',
    path: join(__dirname, 'migrations'),
  },
};

export default config;
