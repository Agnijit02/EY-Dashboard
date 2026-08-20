import { prisma } from '../config/database';
import { logger } from '../config/logger';

export interface AuditInput {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: unknown;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditLog(data: AuditInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        metadata: data.metadata as any,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  } catch (error) {
    logger.warn({ error, data }, 'Failed to record audit log');
  }
}
