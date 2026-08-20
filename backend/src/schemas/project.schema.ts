import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().trim().min(3, 'Project name must be at least 3 characters').max(150),
  code: z.string().trim().min(2, 'Project code must be at least 2 characters').max(20),
  description: z.string().trim().max(1000).optional(),
  clientId: z.string().min(1, 'Client ID is required'),
  ownerId: z.string().min(1).optional(),
  budget: z.number().nonnegative().default(0),
  progress: z.number().min(0).max(100).default(0),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();
