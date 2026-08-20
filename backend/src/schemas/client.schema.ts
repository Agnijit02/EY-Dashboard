import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().trim().min(2, 'Client name must be at least 2 characters').max(150),
  industry: z.string().trim().max(100).optional(),
  status: z.enum(['ACTIVE', 'AT_RISK', 'INACTIVE']).default('ACTIVE'),
  totalContractValue: z.number().nonnegative().default(0),
  projectCount: z.number().int().nonnegative().default(0),
});

export const updateClientSchema = createClientSchema.partial();
