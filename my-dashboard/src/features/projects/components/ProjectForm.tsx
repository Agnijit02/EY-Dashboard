import { useEffect } from 'react';
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Project } from '../projects.types';
import { projectFormSchema } from '../projects.schema';
import type { ProjectFormValues } from '../projects.schema';

interface ProjectFormProps {
	project?: Project | null;
	isSubmitting?: boolean;
	onSubmit: (values: ProjectFormValues) => void;
	onCancel: () => void;
}

const managers = ['Rahul Sharma', 'Priya Mehta', 'Arjun Das', 'Sneha Kapoor', 'Vikram Singh'];

const departments = ['Technology', 'Consulting', 'Operations', 'Strategy'];

const todayIso = new Date().toISOString().split('T')[0];
const futureIso = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];

const DEFAULT_FORM_VALUES: ProjectFormValues = {
	name: '',
	code: '',
	client: '',
	manager: 'Rahul Sharma',
	status: 'active',
	region: 'india',
	department: 'Consulting',
	budget: 5,
	progress: 0,
	startDate: todayIso,
	endDate: futureIso,
	teamSize: 5,
	description: '',
};

function ProjectForm({ project, isSubmitting = false, onSubmit, onCancel }: ProjectFormProps) {
	const isEditMode = Boolean(project);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<ProjectFormValues>({
		resolver: zodResolver(projectFormSchema) as Resolver<ProjectFormValues>,
		defaultValues: project
			? {
					name: project.name,
					code: project.code,
					client: project.client,
					manager: project.manager,
					status: project.status,
					region: project.region,
					department: project.department,
					budget: project.budget,
					progress: project.progress,
					startDate: project.startDate,
					endDate: project.endDate,
					teamSize: project.teamSize,
					description: project.description,
			  }
			: DEFAULT_FORM_VALUES,
	});

	const projectName = watch('name');
	const projectCode = watch('code');

	// Optional helper: If code is untouched and user types name, auto-suggest clean code
	const handleGenerateCode = () => {
		if (projectName && !projectCode) {
			const cleanPrefix = projectName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
			setValue('code', `PRJ-${cleanPrefix || 'NEW'}-${Math.floor(100 + Math.random() * 900)}`);
		}
	};

	// Only populate form when switching to an existing project to edit
	useEffect(() => {
		if (project) {
			reset({
				name: project.name,
				code: project.code,
				client: project.client,
				manager: project.manager,
				status: project.status,
				region: project.region,
				department: project.department,
				budget: project.budget,
				progress: project.progress,
				startDate: project.startDate,
				endDate: project.endDate,
				teamSize: project.teamSize,
				description: project.description,
			});
		}
	}, [project, reset]);

	const handleFormSubmit: SubmitHandler<ProjectFormValues> = (values) => {
		// Ensure robust fallback for any empty fields before emitting
		const sanitizedValues: ProjectFormValues = {
			...values,
			code: values.code.trim() || `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
			description: values.description?.trim() || `${values.name} strategic delivery program for ${values.client}.`,
			startDate: values.startDate || todayIso,
			endDate: values.endDate || futureIso,
		};
		onSubmit(sanitizedValues);
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
			{/* Basic Information */}
			<section>
				<h3 className="text-sm font-semibold text-slate-900">Basic Information</h3>

				<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
					{/* Project Name */}
					<div>
						<label htmlFor="project-name" className="mb-1.5 block text-xs font-medium text-slate-600">
							Project Name *
						</label>
						<input
							id="project-name"
							{...register('name')}
							onBlur={handleGenerateCode}
							placeholder="e.g. Avengers Initiative, Project Alpha, Core ERP"
							className={`h-10 w-full rounded-lg border px-3 text-sm outline-none transition-colors ${
								errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100'
							}`}
						/>
						{errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
					</div>

					{/* Code */}
					<div>
						<label htmlFor="project-code" className="mb-1.5 block text-xs font-medium text-slate-600">
							Project Code *
						</label>
						<input
							id="project-code"
							{...register('code')}
							placeholder="e.g. RPG600, MARK-11, PRJ-0099, SAP-V2"
							disabled={isEditMode}
							className={`h-10 w-full rounded-lg border px-3 text-sm uppercase outline-none transition-colors disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
								errors.code ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100'
							}`}
						/>
						{errors.code && <p className="mt-1 text-xs text-red-600">{errors.code.message}</p>}
					</div>

					{/* Client */}
					<div>
						<label htmlFor="project-client" className="mb-1.5 block text-xs font-medium text-slate-600">
							Client Name *
						</label>
						<input
							id="project-client"
							{...register('client')}
							placeholder="e.g. EDITH-Tech, Stark Industries, Global Corp"
							className={`h-10 w-full rounded-lg border px-3 text-sm outline-none transition-colors ${
								errors.client ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100'
							}`}
						/>
						{errors.client && <p className="mt-1 text-xs text-red-600">{errors.client.message}</p>}
					</div>

					{/* Manager */}
					<div>
						<label htmlFor="project-manager-form" className="mb-1.5 block text-xs font-medium text-slate-600">
							Project Manager
						</label>
						<select
							id="project-manager-form"
							{...register('manager')}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
						>
							{managers.map((manager) => (
								<option key={manager} value={manager}>
									{manager}
								</option>
							))}
						</select>
					</div>
				</div>
			</section>

			{/* Classification */}
			<section>
				<h3 className="text-sm font-semibold text-slate-900">Classification</h3>

				<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
					{/* Status */}
					<div>
						<label htmlFor="form-status" className="mb-1.5 block text-xs font-medium text-slate-600">
							Status
						</label>
						<select
							id="form-status"
							{...register('status')}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						>
							<option value="active">Active</option>
							<option value="completed">Completed</option>
							<option value="at-risk">At Risk</option>
							<option value="delayed">Delayed</option>
						</select>
					</div>

					{/* Region */}
					<div>
						<label htmlFor="form-region" className="mb-1.5 block text-xs font-medium text-slate-600">
							Region
						</label>
						<select
							id="form-region"
							{...register('region')}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						>
							<option value="india">India</option>
							<option value="europe">Europe</option>
							<option value="americas">Americas</option>
							<option value="apac">APAC</option>
						</select>
					</div>

					{/* Department */}
					<div>
						<label htmlFor="form-department" className="mb-1.5 block text-xs font-medium text-slate-600">
							Department
						</label>
						<select
							id="form-department"
							{...register('department')}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						>
							{departments.map((department) => (
								<option key={department} value={department}>
									{department}
								</option>
							))}
						</select>
					</div>
				</div>
			</section>

			{/* Financial & Delivery */}
			<section>
				<h3 className="text-sm font-semibold text-slate-900">Financial & Delivery</h3>

				<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
					{/* Budget */}
					<div>
						<label htmlFor="form-budget" className="mb-1.5 block text-xs font-medium text-slate-600">
							Budget (₹ Cr)
						</label>
						<input
							id="form-budget"
							type="number"
							step="0.1"
							{...register('budget')}
							className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>

					{/* Progress */}
					<div>
						<label htmlFor="form-progress" className="mb-1.5 block text-xs font-medium text-slate-600">
							Progress (%)
						</label>
						<input
							id="form-progress"
							type="number"
							min="0"
							max="100"
							{...register('progress')}
							className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>

					{/* Team */}
					<div>
						<label htmlFor="form-team" className="mb-1.5 block text-xs font-medium text-slate-600">
							Team Size
						</label>
						<input
							id="form-team"
							type="number"
							min="1"
							{...register('teamSize')}
							className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>
				</div>
			</section>

			{/* Dates */}
			<section>
				<h3 className="text-sm font-semibold text-slate-900">Timeline</h3>

				<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label htmlFor="form-start-date" className="mb-1.5 block text-xs font-medium text-slate-600">
							Start Date
						</label>
						<input
							id="form-start-date"
							type="date"
							{...register('startDate')}
							className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>

					<div>
						<label htmlFor="form-end-date" className="mb-1.5 block text-xs font-medium text-slate-600">
							End Date
						</label>
						<input
							id="form-end-date"
							type="date"
							{...register('endDate')}
							className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>
				</div>
			</section>

			{/* Description */}
			<section>
				<label htmlFor="form-description" className="mb-1.5 block text-xs font-medium text-slate-600">
					Description
				</label>
				<textarea
					id="form-description"
					rows={3}
					{...register('description')}
					placeholder="Describe project objectives, scope, or deliverables (optional)..."
					className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
				/>
			</section>

			{/* Actions */}
			<div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
				<button
					type="button"
					onClick={onCancel}
					disabled={isSubmitting}
					className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
				>
					Cancel
				</button>

				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Project'}
				</button>
			</div>
		</form>
	);
}

export default ProjectForm;