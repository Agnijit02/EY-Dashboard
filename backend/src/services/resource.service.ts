import { ApiError } from '../utils/ApiError';
import * as resourceRepository from '../repositories/resource.repository';
import type { Prisma } from '@prisma/client';

export async function getResources(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  department?: string;
  status?: string;
}) {
  const page = Number(params?.page) || 1;
  const pageSize = Number(params?.pageSize) || 20;
  const skip = (page - 1) * pageSize;

  const where: Prisma.ResourceWhereInput = {};

  if (params?.search) {
    where.OR = [
      { name: { contains: params.search, mode: 'insensitive' } },
      { email: { contains: params.search, mode: 'insensitive' } },
      { designation: { contains: params.search, mode: 'insensitive' } },
    ];
  }

  if (params?.department && params.department !== 'all') {
    where.department = params.department.toUpperCase() as any;
  }

  if (params?.status && params.status !== 'all') {
    where.status = params.status.toUpperCase() as any;
  }

  const { items, total } = await resourceRepository.findResources({
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

export async function getResource(id: string) {
  const resource = await resourceRepository.findResourceById(id);
  if (!resource) {
    throw new ApiError(404, 'Resource not found', 'RESOURCE_NOT_FOUND');
  }
  return resource;
}

export async function createResource(data: Prisma.ResourceCreateInput) {
  return resourceRepository.createResource(data);
}

export async function updateResource(id: string, data: Prisma.ResourceUpdateInput) {
  await getResource(id);
  return resourceRepository.updateResource(id, data);
}

export async function deleteResource(id: string) {
  await getResource(id);
  return resourceRepository.deleteResource(id);
}
