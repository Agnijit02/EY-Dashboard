import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import { env } from './config/env';
import { logger } from './config/logger';
import { prisma } from './config/database';
import { requestIdMiddleware } from './middlewares/requestId.middleware';
import { generalRateLimit } from './middlewares/rateLimit.middleware';
import { notFoundMiddleware } from './middlewares/notFound.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes';

const app = express();

// Hardened Helmet configuration
app.use(
  helmet({
    contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  }),
);

// Hardened CORS
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

// Rate Limiting
app.use(generalRateLimit);

// Request body limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// Request ID & Logging
app.use(requestIdMiddleware);
app.use(
  pinoHttp({
    logger,
    customProps: (req) => ({
      requestId: (req as any).id,
    }),
  }),
);

// Liveness probe (process is running)
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      service: 'ey-enterprise-api',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

// Readiness probe (checks database connection)
app.get('/ready', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      data: {
        status: 'ready',
        database: 'connected',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: {
        status: 'not_ready',
        database: 'disconnected',
        message: 'Database server is currently unavailable.',
      },
    });
  }
});

app.use('/api/v1', routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
