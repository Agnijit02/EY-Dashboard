import app from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import { prisma } from './config/database';

const server = app.listen(env.PORT, () => {
  logger.info(`API server running on port ${env.PORT}`);
});

async function shutdown(signal: string) {
  logger.info(`${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    try {
      await prisma.$disconnect();
      logger.info('Database connection closed. Server terminated.');
      process.exit(0);
    } catch (err) {
      logger.error(err, 'Error during database disconnect');
      process.exit(1);
    }
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
