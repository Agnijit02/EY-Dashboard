import { z } from 'zod';

export const projectFormSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(1, 'Project name is required')
			.max(150, 'Project name cannot exceed 150 characters'),

		code: z
			.string()
			.trim()
			.min(1, 'Project code is required')
			.max(50, 'Project code cannot exceed 50 characters'),

		client: z
			.string()
			.trim()
			.min(1, 'Client name is required')
			.max(150, 'Client name cannot exceed 150 characters'),

		manager: z
			.string()
			.trim()
			.min(1, 'Please select or enter a manager')
			.default('Rahul Sharma'),

		status: z
			.enum(['active', 'completed', 'at-risk', 'delayed'])
			.default('active'),

		region: z
			.enum(['india', 'europe', 'americas', 'apac'])
			.default('india'),

		department: z
			.string()
			.trim()
			.min(1, 'Department is required')
			.default('Consulting'),

		budget: z.coerce
			.number()
			.nonnegative('Budget must be positive')
			.default(1),

		progress: z.coerce
			.number()
			.min(0, 'Progress cannot be below 0%')
			.max(100, 'Progress cannot exceed 100%')
			.default(0),

		startDate: z
			.string()
			.min(1, 'Start date is required')
			.default(() => new Date().toISOString().split('T')[0]),

		endDate: z
			.string()
			.min(1, 'End date is required')
			.default(() => new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0]),

		teamSize: z.coerce
			.number()
			.int()
			.positive('Team size must be at least 1')
			.default(1),

		description: z
			.string()
			.trim()
			.default('Enterprise strategic delivery and transformation project.'),
	})
	.refine(
		(data) => {
			if (!data.startDate || !data.endDate) return true;
			return new Date(data.endDate) >= new Date(data.startDate);
		},
		{
			message: 'End date must be on or after start date',
			path: ['endDate'],
		},
	);

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
