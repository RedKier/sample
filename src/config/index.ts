import { resolve } from 'path';
import { config } from 'dotenv';
import { ValidateNested } from 'class-validator';

config({ path: resolve(__dirname, '../../.env') });

import { APP, ApplicationConfig } from './application.config';
import { DB, DatabaseConfig } from './database.config';
import { configValidation } from './configValidation';

export class Config {
  @ValidateNested()
  APP: ApplicationConfig = APP;

  @ValidateNested()
  DB: DatabaseConfig = DB;
}

export const CONFIG = new Config();

configValidation(CONFIG);
