import { prisma } from '../config/database';
import type { Prisma } from '@prisma/client';

export async function findRisks(params?: {
  skip?: number;
  take?: number;
  where?: Prisma.RiskWhereInput;
}) {
  const [items, total] = await Promise.all([
    prisma.risk.findMany({
      skip: params?.skip,
      take: params?.take,
      where: params?.where,
      include: {
        project: true,
        owner: true,
      },
      orderBy: {
        score: 'desc',
      },
    }),
    prisma.risk.count({
      where: params?.where,
    }),
  ]);

  return { items, total };
}

export async function findRiskById(id: string) {
  return prisma.risk.findUnique({
    where: { id },
    include: {
      project: true,
      owner: true,
    },
  });
}

export async function createRisk(data: Prisma.RiskCreateInput) {
  return prisma.risk.create({
    data,
    include: {
      project: true,
      owner: true,
    },
  });
}

export async function updateRisk(id: string, data: Prisma.RiskUpdateInput) {
  return prisma.risk.update({
    where: { id },
    data,
    include: {
      project: true,
      owner: true,
    },
  });
}

export async function deleteRisk(id: string) {
  return prisma.risk.delete({
    where: { id },
  });
}
