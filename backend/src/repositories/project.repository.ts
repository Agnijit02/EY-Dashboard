import { prisma } from '../config/database';
import type { Prisma } from '@prisma/client';

export async function findProjects(params?: {
  skip?: number;
  take?: number;
  where?: Prisma.ProjectWhereInput;
}) {
  const [items, total] = await Promise.all([
    prisma.project.findMany({
      skip: params?.skip,
      take: params?.take,
      where: params?.where,
      include: {
        client: true,
        owner: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.project.count({
      where: params?.where,
    }),
  ]);

  return { items, total };
}

export async function findProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      client: true,
      owner: true,
      risks: true,
    },
  });
}

export async function createProject(data: Prisma.ProjectCreateInput) {
  return prisma.project.create({
    data,
    include: {
      client: true,
      owner: true,
    },
  });
}

export async function updateProject(id: string, data: Prisma.ProjectUpdateInput) {
  return prisma.project.update({
    where: { id },
    data,
    include: {
      client: true,
      owner: true,
    },
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}
