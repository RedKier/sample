import { resolve } from 'path';
import { config } from 'dotenv';
import { ValidateNested } from 'class-validator';

config({ path: resolve(__dirname, '../../.env') });

import { APP, ApplicationConfig } from '@config/application.config';
import { configValidation } from '@config/configValidation';

export class Config {
  @ValidateNested()
  APP: ApplicationConfig = APP;
}

export const CONFIG = new Config();

configValidation(CONFIG)
