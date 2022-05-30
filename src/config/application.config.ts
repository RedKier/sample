import { IsIn, Min, Max } from 'class-validator';

const envTypes = ['development', 'production'] as const;
type EnvType = typeof envTypes[number];

export class ApplicationConfig {
  @Min(0, {
    message: 'APP_PORT must be valid number in range 0-65535',
  })
  @Max(65535, {
    message: 'APP_PORT must be valid number in range 0-65535',
  })
  PORT = Number(process.env.PORT);

  @IsIn(envTypes, {
    message: `NODE_ENV must be defined as one of: ${envTypes.join(', ')}`,
  })
  ENV = process.env.NODE_ENV?.toLowerCase() as EnvType;
}

export const APP = new ApplicationConfig();
