import { prisma } from '../config/database';
import type { Prisma } from '@prisma/client';

export async function findClients(params?: {
  skip?: number;
  take?: number;
  where?: Prisma.ClientWhereInput;
}) {
  const [items, total] = await Promise.all([
    prisma.client.findMany({
      skip: params?.skip,
      take: params?.take,
      where: params?.where,
      include: {
        projects: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.client.count({
      where: params?.where,
    }),
  ]);

  return { items, total };
}

export async function findClientById(id: string) {
  return prisma.client.findUnique({
    where: { id },
    include: {
      projects: true,
    },
  });
}

export async function createClient(data: Prisma.ClientCreateInput) {
  return prisma.client.create({
    data,
  });
}

export async function updateClient(id: string, data: Prisma.ClientUpdateInput) {
  return prisma.client.update({
    where: { id },
    data,
  });
}

export async function deleteClient(id: string) {
  return prisma.client.delete({
    where: { id },
  });
}
