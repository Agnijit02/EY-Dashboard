import { ApiError } from '../utils/ApiError';
import * as projectRepository from '../repositories/project.repository';
import type { Prisma } from '@prisma/client';

export async function getProjects(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  region?: string;
  clientId?: string;
}) {
  const page = Number(params?.page) || 1;
  const pageSize = Number(params?.pageSize) || 20;
  const skip = (page - 1) * pageSize;

  const where: Prisma.ProjectWhereInput = {};

  if (params?.search) {
    where.OR = [
      { name: { contains: params.search, mode: 'insensitive' } },
      { code: { contains: params.search, mode: 'insensitive' } },
      { description: { contains: params.search, mode: 'insensitive' } },
    ];
  }

  if (params?.status && params.status !== 'all') {
    where.status = params.status.toUpperCase() as any;
  }

  if (params?.clientId) {
    where.clientId = params.clientId;
  }

  const { items, total } = await projectRepository.findProjects({
    skip,
    take: pageSize,
    where,
  });

  return {
    items,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    },
  };
}

export async function getProject(id: string) {
  const project = await projectRepository.findProjectById(id);
  if (!project) {
    throw new ApiError(404, 'Project not found', 'PROJECT_NOT_FOUND');
  }
  return project;
}

export async function createProject(data: {
  name: string;
  code: string;
  description?: string;
  clientId: string;
  ownerId?: string;
  budget?: number;
  progress?: number;
  startDate?: Date;
  endDate?: Date;
}) {
  return projectRepository.createProject({
    name: data.name,
    code: data.code,
    description: data.description,
    budget: data.budget ?? 0,
    progress: data.progress ?? 0,
    spent: (data.budget ?? 0) * ((data.progress ?? 0) / 100) * 0.70,
    startDate: data.startDate,
    endDate: data.endDate,
    client: {
      connect: { id: data.clientId },
    },
    ...(data.ownerId ? { owner: { connect: { id: data.ownerId } } } : {}),
  });
}

export async function updateProject(id: string, data: Record<string, any>) {
  await getProject(id);

  const updateData: Prisma.ProjectUpdateInput = { ...data };
  if (data.clientId) {
    updateData.client = { connect: { id: data.clientId } };
    delete (updateData as any).clientId;
  }
  if (data.ownerId) {
    updateData.owner = { connect: { id: data.ownerId } };
    delete (updateData as any).ownerId;
  }

  return projectRepository.updateProject(id, updateData);
}

export async function deleteProject(id: string) {
  await getProject(id);
  return projectRepository.deleteProject(id);
}
