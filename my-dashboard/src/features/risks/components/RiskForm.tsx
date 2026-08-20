import { useState } from 'react';
import type { CreateRiskPayload, RiskCategory } from '../risks.types';
import { computeRiskSeverity } from '../risks.service';

interface RiskFormProps {
	isSubmitting?: boolean;
	onSubmit: (payload: CreateRiskPayload) => void;
	onCancel: () => void;
}

const categories: RiskCategory[] = [
	'technical',
	'financial',
	'operational',
	'security',
	'resource',
	'compliance',
];

const projects = [
	'Phoenix',
	'Atlas',
	'Orion',
	'Horizon',
	'Mercury',
	'Apollo',
	'Nexus',
	'Stark Industries',
	'Global Transformation',
];

function RiskForm({ isSubmitting = false, onSubmit, onCancel }: RiskFormProps) {
	const [title, setTitle] = useState('');
	const [projectName, setProjectName] = useState('Phoenix');
	const [category, setCategory] = useState<RiskCategory>('technical');
	const [probability, setProbability] = useState<number>(4);
	const [impact, setImpact] = useState<number>(4);
	const [owner, setOwner] = useState('Rahul Sharma');
	const [dueDate, setDueDate] = useState(
		new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
	);
	const [description, setDescription] = useState('');
	const [mitigationPlan, setMitigationPlan] = useState('');
	const [error, setError] = useState('');

	const score = probability * impact;
	const severity = computeRiskSeverity(score);

	const getSeverityBadge = () => {
		switch (severity) {
			case 'critical':
				return 'bg-rose-100 text-rose-800 border-rose-200';
			case 'high':
				return 'bg-orange-100 text-orange-800 border-orange-200';
			case 'medium':
				return 'bg-amber-100 text-amber-800 border-amber-200';
			default:
				return 'bg-emerald-100 text-emerald-800 border-emerald-200';
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) {
			setError('Please provide a risk title');
			return;
		}

		onSubmit({
			title: title.trim(),
			projectName,
			category,
			probability: Number(probability),
			impact: Number(impact),
			owner: owner.trim() || 'Rahul Sharma',
			dueDate,
			description: description.trim() || `${title} on project ${projectName}.`,
			mitigationPlan: mitigationPlan.trim() || 'Deploy technical mitigation and continuous monitoring.',
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			{error && (
				<div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
					{error}
				</div>
			)}

			{/* Risk Title & Project */}
			<section>
				<h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Risk Overview</h3>
				<div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label htmlFor="risk-title" className="mb-1 block text-xs font-medium text-slate-700">
							Risk Title *
						</label>
						<input
							id="risk-title"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
								setError('');
							}}
							placeholder="e.g. Database schema migration latency"
							className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
							required
						/>
					</div>

					<div>
						<label htmlFor="risk-project" className="mb-1 block text-xs font-medium text-slate-700">
							Associated Project
						</label>
						<select
							id="risk-project"
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						>
							{projects.map((p) => (
								<option key={p} value={p}>
									{p}
								</option>
							))}
						</select>
					</div>
				</div>
			</section>

			{/* Category & Governance Score Matrix */}
			<section className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
				<div className="flex items-center justify-between">
					<h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
						Impact Score & Severity
					</h3>
					<span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase ${getSeverityBadge()}`}>
						{severity} (Score: {score})
					</span>
				</div>

				<div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div>
						<label htmlFor="risk-category" className="mb-1 block text-xs font-medium text-slate-700">
							Risk Category
						</label>
						<select
							id="risk-category"
							value={category}
							onChange={(e) => setCategory(e.target.value as RiskCategory)}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400 capitalize"
						>
							{categories.map((c) => (
								<option key={c} value={c} className="capitalize">
									{c}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="risk-prob" className="mb-1 block text-xs font-medium text-slate-700">
							Probability (1 - 5)
						</label>
						<input
							id="risk-prob"
							type="number"
							min="1"
							max="5"
							value={probability}
							onChange={(e) => setProbability(Number(e.target.value))}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>

					<div>
						<label htmlFor="risk-impact" className="mb-1 block text-xs font-medium text-slate-700">
							Impact (1 - 5)
						</label>
						<input
							id="risk-impact"
							type="number"
							min="1"
							max="5"
							value={impact}
							onChange={(e) => setImpact(Number(e.target.value))}
							className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
						/>
					</div>
				</div>
			</section>

			{/* Governance Ownership & Due Date */}
			<section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label htmlFor="risk-owner" className="mb-1 block text-xs font-medium text-slate-700">
						Risk Owner / Lead
					</label>
					<input
						id="risk-owner"
						value={owner}
						onChange={(e) => setOwner(e.target.value)}
						placeholder="e.g. Rahul Sharma"
						className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
					/>
				</div>

				<div>
					<label htmlFor="risk-due" className="mb-1 block text-xs font-medium text-slate-700">
						Resolution Due Date
					</label>
					<input
						id="risk-due"
						type="date"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
					/>
				</div>
			</section>

			{/* Description */}
			<section>
				<label htmlFor="risk-desc" className="mb-1 block text-xs font-medium text-slate-700">
					Risk Description
				</label>
				<textarea
					id="risk-desc"
					rows={2}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Detailed context on technical, delivery, or security exposure..."
					className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
				/>
			</section>

			{/* Mitigation Action Plan */}
			<section>
				<label htmlFor="risk-mitigation" className="mb-1 block text-xs font-medium text-slate-700">
					Mitigation Action Plan
				</label>
				<textarea
					id="risk-mitigation"
					rows={2}
					value={mitigationPlan}
					onChange={(e) => setMitigationPlan(e.target.value)}
					placeholder="Describe mitigation steps, contingency resources, and architectural controls..."
					className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
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
					{isSubmitting ? 'Registering Risk...' : 'Register Risk'}
				</button>
			</div>
		</form>
	);
}

export default RiskForm;
