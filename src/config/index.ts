import { resolve } from 'path';
import { config } from 'dotenv';
import { ValidateNested } from 'class-validator';

config({ path: resolve(__dirname, '../../.env') });

import { APP, ApplicationConfig } from '@config/application.config';
import { DB, DatabaseConfig } from '@config/database.config';
import { configValidation } from '@config/configValidation';

export class Config {
  @ValidateNested()
  APP: ApplicationConfig = APP;

  @ValidateNested()
  DB: DatabaseConfig = DB;
}

export const CONFIG = new Config();

configValidation(CONFIG);
