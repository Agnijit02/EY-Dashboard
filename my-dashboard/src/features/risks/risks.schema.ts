import { z } from 'zod';

export const riskFormSchema = z.object({
	title: z.string().trim().min(3, 'Risk title is required').max(150, 'Risk title is too long'),
	description: z.string().trim().min(10, 'Description must be at least 10 characters'),
	projectId: z.string().min(1, 'Select a project'),
	category: z.enum(['technical', 'financial', 'operational', 'security', 'resource', 'compliance']),
	probability: z.coerce.number().int().min(1).max(5),
	impact: z.coerce.number().int().min(1).max(5),
	status: z.enum(['open', 'monitoring', 'mitigated', 'closed']),
	owner: z.string().min(1, 'Select a risk owner'),
	dueDate: z.string().min(1, 'Due date is required'),
	mitigationPlan: z.string().trim().min(10, 'Mitigation plan is required'),
});

export type RiskFormValues = z.infer<typeof riskFormSchema>;
