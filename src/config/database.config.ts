import { IsNotEmpty, Min, Max } from 'class-validator';

export class DatabaseConfig {
  @IsNotEmpty({
    message: 'DB_HOST must be specified',
  })
  HOST = process.env.DB_HOST;

  @Min(0, {
    message: 'APP_PORT must be valid number in range 0-65535',
  })
  @Max(65535, {
    message: 'APP_PORT must be valid number in range 0-65535',
  })
  PORT = Number(process.env.DB_PORT);

  @IsNotEmpty({
    message: 'DB_USERNAME must be specified',
  })
  USERNAME = process.env.DB_USERNAME;

  @IsNotEmpty({
    message: 'DB_PASSWORD must be specified',
  })
  PASSWORD = process.env.DB_PASSWORD;

  @IsNotEmpty({
    message: 'DB_DATABASE must be specified',
  })
  DATABASE = process.env.DB_DATABASE;

  @IsNotEmpty({
    message: 'DB_IS_SSL_ALLOWED must be specified',
  })
  IS_SSL_ALLOWED = process.env.DB_IS_SSL_ALLOWED;
}

export const DB = new DatabaseConfig();
