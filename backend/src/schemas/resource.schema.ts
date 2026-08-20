import { z } from 'zod';

export const createResourceSchema = z.object({
  name: z.string().trim().min(2, 'Resource name must be at least 2 characters').max(150),
  email: z.string().trim().email('Invalid email address'),
  department: z.enum(['ENGINEERING', 'CONSULTING', 'ANALYTICS', 'STRATEGY', 'OPERATIONS']),
  designation: z.string().trim().max(100).optional(),
  allocation: z.number().int().min(0).max(100).default(0),
  availability: z.number().int().min(0).max(100).default(100),
  status: z.enum(['ACTIVE', 'ON_LEAVE', 'INACTIVE']).default('ACTIVE'),
});

export const updateResourceSchema = createResourceSchema.partial();
