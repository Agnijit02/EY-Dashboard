import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().min(1).default('postgresql://postgres:password@localhost:5432/ey_platform'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z.string().default('info'),
  JWT_ACCESS_SECRET: z.string().min(16).default('development-jwt-access-secret-key-32chars-min!'),
  JWT_REFRESH_SECRET: z.string().min(16).default('development-jwt-refresh-secret-key-32chars-min!'),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('15m'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
});

export const env = envSchema.parse(process.env);
