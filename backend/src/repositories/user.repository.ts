import { prisma } from '../config/database';

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });
}

export async function updateLastLogin(id: string) {
  return prisma.user.update({
    where: { id },
    data: {
      lastLoginAt: new Date(),
    },
  });
}

export async function createRefreshToken(data: {
  tokenHash: string;
  userId: string;
  expiresAt: Date;
}) {
  return prisma.refreshToken.create({
    data,
  });
}

export async function findRefreshToken(tokenHash: string) {
  return prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: {
      user: true,
    },
  });
}

export async function revokeRefreshToken(id: string) {
  return prisma.refreshToken.update({
    where: { id },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function revokeAllUserTokens(userId: string) {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}
