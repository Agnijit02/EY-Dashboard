import { ApiError } from '../utils/ApiError';
import * as clientRepository from '../repositories/client.repository';
import type { Prisma } from '@prisma/client';

export async function getClients(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  industry?: string;
  status?: string;
}) {
  const page = Number(params?.page) || 1;
  const pageSize = Number(params?.pageSize) || 20;
  const skip = (page - 1) * pageSize;

  const where: Prisma.ClientWhereInput = {};

  if (params?.search) {
    where.OR = [
      { name: { contains: params.search, mode: 'insensitive' } },
      { industry: { contains: params.search, mode: 'insensitive' } },
    ];
  }

  if (params?.status && params.status !== 'all') {
    where.status = params.status.toUpperCase() as any;
  }

  if (params?.industry && params.industry !== 'all') {
    where.industry = params.industry;
  }

  const { items, total } = await clientRepository.findClients({
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

export async function getClient(id: string) {
  const client = await clientRepository.findClientById(id);
  if (!client) {
    throw new ApiError(404, 'Client not found', 'CLIENT_NOT_FOUND');
  }
  return client;
}

export async function createClient(data: Prisma.ClientCreateInput) {
  return clientRepository.createClient(data);
}

export async function updateClient(id: string, data: Prisma.ClientUpdateInput) {
  await getClient(id);
  return clientRepository.updateClient(id, data);
}

export async function deleteClient(id: string) {
  await getClient(id);
  return clientRepository.deleteClient(id);
}
