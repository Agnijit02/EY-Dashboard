import { X } from 'lucide-react';
import type { Risk } from '../risks.types';
import RiskSeverityBadge from './RiskSeverityBadge';

interface RiskDetailsDrawerProps {
	risk: Risk | null;
	onClose: () => void;
}

function RiskDetailsDrawer({ risk, onClose }: RiskDetailsDrawerProps) {
	if (!risk) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50">
			<button type="button" onClick={onClose} aria-label="Close" className="absolute inset-0 bg-slate-950/20" />
			<aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl">
				<div className="border-b border-slate-200 p-6">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-xs font-medium text-slate-400">{risk.riskId}</p>
							<h2 className="mt-1 text-xl font-semibold text-slate-900">{risk.title}</h2>
							<div className="mt-3">
								<RiskSeverityBadge severity={risk.severity} />
							</div>
						</div>

						<button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
							<X className="h-5 w-5" />
						</button>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto p-6">
					<div className="grid grid-cols-2 gap-4">
						<div className="rounded-xl bg-slate-50 p-4">
							<p className="text-xs text-slate-400">Risk Score</p>
							<p className="mt-1 text-2xl font-semibold text-slate-900">
								{risk.score}
								<span className="text-sm font-normal text-slate-400">/25</span>
							</p>
						</div>

						<div className="rounded-xl bg-slate-50 p-4">
							<p className="text-xs text-slate-400">Project</p>
							<p className="mt-1 text-sm font-semibold text-slate-900">{risk.projectName}</p>
						</div>
					</div>

					<section className="mt-8">
						<h3 className="text-sm font-semibold text-slate-900">Description</h3>
						<p className="mt-3 text-sm leading-6 text-slate-500">{risk.description}</p>
					</section>

					<section className="mt-8">
						<h3 className="text-sm font-semibold text-slate-900">Risk Assessment</h3>
						<div className="mt-4 grid grid-cols-2 gap-4">
							<div>
								<p className="text-xs text-slate-400">Probability</p>
								<p className="mt-1 text-sm font-semibold text-slate-900">{risk.probability}/5</p>
							</div>
							<div>
								<p className="text-xs text-slate-400">Impact</p>
								<p className="mt-1 text-sm font-semibold text-slate-900">{risk.impact}/5</p>
							</div>
						</div>
					</section>

					<section className="mt-8">
						<h3 className="text-sm font-semibold text-slate-900">Mitigation Plan</h3>
						<p className="mt-3 text-sm leading-6 text-slate-500">{risk.mitigationPlan}</p>
					</section>

					<section className="mt-8 grid grid-cols-2 gap-4">
						<div>
							<p className="text-xs text-slate-400">Owner</p>
							<p className="mt-1 text-sm font-medium text-slate-900">{risk.owner}</p>
						</div>
						<div>
							<p className="text-xs text-slate-400">Due Date</p>
							<p className="mt-1 text-sm font-medium text-slate-900">{risk.dueDate}</p>
						</div>
					</section>
				</div>
			</aside>
		</div>
	);
}

export default RiskDetailsDrawer;
