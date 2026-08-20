import { prisma } from '../config/database';
import type { Prisma } from '@prisma/client';

export async function findResources(params?: {
  skip?: number;
  take?: number;
  where?: Prisma.ResourceWhereInput;
}) {
  const [items, total] = await Promise.all([
    prisma.resource.findMany({
      skip: params?.skip,
      take: params?.take,
      where: params?.where,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.resource.count({
      where: params?.where,
    }),
  ]);

  return { items, total };
}

export async function findResourceById(id: string) {
  return prisma.resource.findUnique({
    where: { id },
  });
}

export async function createResource(data: Prisma.ResourceCreateInput) {
  return prisma.resource.create({
    data,
  });
}

export async function updateResource(id: string, data: Prisma.ResourceUpdateInput) {
  return prisma.resource.update({
    where: { id },
    data,
  });
}

export async function deleteResource(id: string) {
  return prisma.resource.delete({
    where: { id },
  });
}
