import { ApiError } from '../utils/ApiError';
import * as riskRepository from '../repositories/risk.repository';
import type { Prisma, RiskSeverity } from '@prisma/client';

function calculateScoreAndSeverity(probability: number, impact: number) {
  const score = probability * impact;
  let severity: RiskSeverity = 'LOW';

  if (score >= 17) {
    severity = 'CRITICAL';
  } else if (score >= 10) {
    severity = 'HIGH';
  } else if (score >= 5) {
    severity = 'MEDIUM';
  }

  return { score, severity };
}

export async function getRisks(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  severity?: string;
  status?: string;
  category?: string;
}) {
  const page = Number(params?.page) || 1;
  const pageSize = Number(params?.pageSize) || 20;
  const skip = (page - 1) * pageSize;

  const where: Prisma.RiskWhereInput = {};

  if (params?.search) {
    where.OR = [
      { title: { contains: params.search, mode: 'insensitive' } },
      { riskId: { contains: params.search, mode: 'insensitive' } },
      { description: { contains: params.search, mode: 'insensitive' } },
    ];
  }

  if (params?.severity && params.severity !== 'all') {
    where.severity = params.severity.toUpperCase() as any;
  }

  if (params?.status && params.status !== 'all') {
    where.status = params.status.toUpperCase() as any;
  }

  if (params?.category && params.category !== 'all') {
    where.category = params.category.toUpperCase() as any;
  }

  const { items, total } = await riskRepository.findRisks({
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

export async function getRisk(id: string) {
  const risk = await riskRepository.findRiskById(id);
  if (!risk) {
    throw new ApiError(404, 'Risk not found', 'RISK_NOT_FOUND');
  }
  return risk;
}

export async function createRisk(data: {
  riskId: string;
  title: string;
  description: string;
  category: any;
  probability: number;
  impact: number;
  status?: any;
  mitigationPlan: string;
  dueDate: Date;
  projectId: string;
  ownerId?: string;
}) {
  const { score, severity } = calculateScoreAndSeverity(data.probability, data.impact);

  return riskRepository.createRisk({
    riskId: data.riskId,
    title: data.title,
    description: data.description,
    category: data.category,
    probability: data.probability,
    impact: data.impact,
    score,
    severity,
    status: data.status ?? 'OPEN',
    mitigationPlan: data.mitigationPlan,
    dueDate: data.dueDate,
    project: { connect: { id: data.projectId } },
    ...(data.ownerId ? { owner: { connect: { id: data.ownerId } } } : {}),
  });
}

export async function updateRisk(id: string, data: Record<string, any>) {
  const existing = await getRisk(id);

  const probability = data.probability ?? existing.probability;
  const impact = data.impact ?? existing.impact;
  const { score, severity } = calculateScoreAndSeverity(probability, impact);

  const updateData: Prisma.RiskUpdateInput = {
    ...data,
    score,
    severity,
  };

  if (data.projectId) {
    updateData.project = { connect: { id: data.projectId } };
    delete (updateData as any).projectId;
  }
  if (data.ownerId) {
    updateData.owner = { connect: { id: data.ownerId } };
    delete (updateData as any).ownerId;
  }

  return riskRepository.updateRisk(id, updateData);
}

export async function deleteRisk(id: string) {
  await getRisk(id);
  return riskRepository.deleteRisk(id);
}
