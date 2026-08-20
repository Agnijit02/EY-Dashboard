import { z } from 'zod';

export const createRiskSchema = z.object({
  riskId: z.string().trim().min(2).max(50),
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().trim().max(1000),
  category: z.enum(['TECHNICAL', 'FINANCIAL', 'OPERATIONAL', 'SECURITY', 'RESOURCE', 'COMPLIANCE']),
  probability: z.number().int().min(1).max(5),
  impact: z.number().int().min(1).max(5),
  status: z.enum(['OPEN', 'MONITORING', 'MITIGATED', 'CLOSED']).default('OPEN'),
  mitigationPlan: z.string().trim().max(1000),
  dueDate: z.coerce.date(),
  projectId: z.string().min(1, 'Project ID is required'),
  ownerId: z.string().min(1).optional(),
});

export const updateRiskSchema = createRiskSchema.partial();
