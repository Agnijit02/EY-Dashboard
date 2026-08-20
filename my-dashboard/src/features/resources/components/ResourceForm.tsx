import { useState } from 'react';
import type { CreateResourcePayload, ResourceDepartment, ResourceRole } from '../resources.types';

interface ResourceFormProps {
	isSubmitting?: boolean;
	onSubmit: (payload: CreateResourcePayload) => void;
	onCancel: () => void;
}

const roles: ResourceRole[] = [
	'Senior Architect',
	'Project Manager',
	'Full Stack Engineer',
	'Data Scientist',
	'UX Designer',
	'DevOps Lead',
];

const departments: ResourceDepartment[] = [
	'Technology',
	'Consulting',
	'Operations',
	'Data',
	'Design',
];

const popularProjects = [
	'Atlas CRM',
	'Project Phoenix',
	'Digital Legacy',
	'Northstar Transformation',
	'Horizon Cloud',
	'Client Insights',
	'Ops Portal',
];

function getStatusPreview(allocation: number) {
	if (allocation <= 70) return { label: 'Available (Bench)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
	if (allocation <= 90) return { label: 'Optimal Workload', color: 'text-sky-700 bg-sky-50 border-sky-200' };
	if (allocation <= 100) return { label: 'Fully Booked (100%)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
	return { label: 'Over-Allocated (>100%)', color: 'text-red-700 bg-red-50 border-red-200' };
}

function ResourceForm({ isSubmitting = false, onSubmit, onCancel }: ResourceFormProps) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState<ResourceRole>('Senior Architect');
	const [department, setDepartment] = useState<ResourceDepartment>('Technology');
	const [location, setLocation] = useState('Bengaluru, India');
	const [allocation, setAllocation] = useState<number>(75);
	const [billableRate, setBillableRate] = useState<number>(130);
	const [experience, setExperience] = useState<number>(8);
	const [skillsInput, setSkillsInput] = useState('Architecture, Cloud, TypeScript');
	const [selectedProjects, setSelectedProjects] = useState<string[]>(['Atlas CRM']);
	const [customProjectInput, setCustomProjectInput] = useState('');
	const [error, setError] = useState('');

	const statusInfo = getStatusPreview(allocation);

	const toggleProject = (projectName: string) => {
		if (selectedProjects.includes(projectName)) {
			setSelectedProjects(selectedProjects.filter((p) => p !== projectName));
		} else {
			setSelectedProjects([...selectedProjects, projectName]);
		}
	};

	const handleAddCustomProject = () => {
		const trimmed = customProjectInput.trim();
		if (trimmed && !selectedProjects.includes(trimmed)) {
			setSelectedProjects([...selectedProjects, trimmed]);
			setCustomProjectInput('');
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) {
			setError('Please enter resource full name');
			return;
		}

		const parsedSkills = skillsInput
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);

		const emailFinal = email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@ey.com`;

		onSubmit({
			name: name.trim(),
			email: emailFinal,
			role,
			department,
			location: location.trim() || 'Mumbai, India',
			allocationPercentage: Number(allocation) || 0,
			billableRate: Number(billableRate) || 120,
			experience: Number(experience) || 5,
			skills: parsedSkills.length > 0 ? parsedSkills : ['Strategic Delivery', 'Technical Architecture'],
			assignedProjects: selectedProjects,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			{error && (
				<div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
					{error}
				</div>
			)}

			{/* Basic Info */}
			<section>
				<h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Consultant Details</h3>
				<div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label htmlFor="res-name" className="mb-1 block text-xs font-medium text-slate-700">
							Full Name *
						</label>
						<input
							id="res-name"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
								setError('');
							}}
							placeholder="e.g. Dr. Jane Foster, Aarav Nair"
							className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
							required
						/>
					</div>

					<div>
						<label htmlFor="res-email" className="mb-1 block text-xs font-medium text-slate-700">
							Work Email
						</label>
						<input
							id="res-email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="e.g. jane.foster@ey.com"
							className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
						/>
					</div>
				</div>
			</section>

			{/* Role & Practice */}
			<section>
				<h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Practice & Role</h3>
				<div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div>
						<label htmlFor="res-role" className="mb-1 block text-xs font-medium text-slate-700">
							Role / Designation
						</label>
						<select
							id="res-role"
							value={role}
							onChange={(e) => setRole(e.target.value as ResourceRole)}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						>
							{roles.map((r) => (
								<option key={r} value={r}>
									{r}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="res-department" className="mb-1 block text-xs font-medium text-slate-700">
							Department Practice
						</label>
						<select
							id="res-department"
							value={department}
							onChange={(e) => setDepartment(e.target.value as ResourceDepartment)}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						>
							{departments.map((d) => (
								<option key={d} value={d}>
									{d}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="res-location" className="mb-1 block text-xs font-medium text-slate-700">
							Office Location
						</label>
						<input
							id="res-location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							placeholder="e.g. Mumbai, Bengaluru, London"
							className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>
				</div>
			</section>

			{/* Workload & Compensation */}
			<section className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
				<div className="flex items-center justify-between">
					<h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Workload & Compensation</h3>
					<span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${statusInfo.color}`}>
						{statusInfo.label}
					</span>
				</div>

				<div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div>
						<label htmlFor="res-allocation" className="mb-1 block text-xs font-medium text-slate-700">
							Workload / Allocation (%)
						</label>
						<input
							id="res-allocation"
							type="number"
							min="0"
							max="150"
							value={allocation}
							onChange={(e) => setAllocation(Number(e.target.value))}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>

					<div>
						<label htmlFor="res-rate" className="mb-1 block text-xs font-medium text-slate-700">
							Billable Rate ($/hr)
						</label>
						<input
							id="res-rate"
							type="number"
							min="10"
							max="1000"
							value={billableRate}
							onChange={(e) => setBillableRate(Number(e.target.value))}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>

					<div>
						<label htmlFor="res-exp" className="mb-1 block text-xs font-medium text-slate-700">
							Experience (Years)
						</label>
						<input
							id="res-exp"
							type="number"
							min="0"
							max="40"
							value={experience}
							onChange={(e) => setExperience(Number(e.target.value))}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>
				</div>
			</section>

			{/* Project Staffing Assignment */}
			<section>
				<label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
					Assign to Active Projects (Staffing Allocation)
				</label>
				<p className="mb-2.5 text-xs text-slate-500">
					Select the client engagements this consultant will contribute to:
				</p>
				<div className="flex flex-wrap gap-2">
					{popularProjects.map((proj) => {
						const isSelected = selectedProjects.includes(proj);
						return (
							<button
								key={proj}
								type="button"
								onClick={() => toggleProject(proj)}
								className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
									isSelected
										? 'border-slate-900 bg-slate-900 text-white'
										: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
								}`}
							>
								{isSelected ? '✓ ' : '+ '}
								{proj}
							</button>
						);
					})}
				</div>

				<div className="mt-3 flex gap-2">
					<input
						value={customProjectInput}
						onChange={(e) => setCustomProjectInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								handleAddCustomProject();
							}
						}}
						placeholder="Or type a custom project name..."
						className="h-9 flex-1 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-slate-400"
					/>
					<button
						type="button"
						onClick={handleAddCustomProject}
						className="rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 hover:bg-slate-100"
					>
						Add Project
					</button>
				</div>
			</section>

			{/* Skills */}
			<section>
				<label htmlFor="res-skills" className="mb-1 block text-xs font-medium text-slate-700">
					Skills & Competencies (comma separated)
				</label>
				<input
					id="res-skills"
					value={skillsInput}
					onChange={(e) => setSkillsInput(e.target.value)}
					placeholder="e.g. System Design, Microservices, Python, React, Cloud"
					className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
				/>
			</section>

			{/* Actions */}
			<div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
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
					className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
				>
					{isSubmitting ? 'Enrolling Resource...' : 'Add Resource'}
				</button>
			</div>
		</form>
	);
}

export default ResourceForm;
