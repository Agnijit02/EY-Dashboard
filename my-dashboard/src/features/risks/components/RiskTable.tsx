import { ChevronRight } from 'lucide-react';
import type { Risk } from '../risks.types';
import RiskScoreBadge from './RiskScoreBadge';
import RiskSeverityBadge from './RiskSeverityBadge';

interface RiskTableProps {
	risks: Risk[];
	onSelect: (risk: Risk) => void;
}

function RiskTable({ risks, onSelect }: RiskTableProps) {
	return (
		<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full min-w-[950px] text-left">
					<thead className="border-b border-slate-200 bg-slate-50">
						<tr>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Risk</th>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Project</th>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Score</th>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Severity</th>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Owner</th>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500" aria-label="Risk actions" />
						</tr>
					</thead>

					<tbody className="divide-y divide-slate-100">
						{risks.map((risk) => (
							<tr key={risk.id} onClick={() => onSelect(risk)} className="cursor-pointer transition-colors hover:bg-slate-50">
								<td className="px-5 py-4">
									<div>
										<p className="text-sm font-medium text-slate-900">{risk.title}</p>
										<p className="mt-0.5 text-xs text-slate-400">{risk.riskId}</p>
									</div>
								</td>
								<td className="px-5 py-4 text-sm text-slate-600">{risk.projectName}</td>
								<td className="px-5 py-4">
									<RiskScoreBadge score={risk.score} severity={risk.severity} />
								</td>
								<td className="px-5 py-4">
									<RiskSeverityBadge severity={risk.severity} />
								</td>
								<td className="px-5 py-4 text-sm text-slate-600">{risk.owner}</td>
								<td className="px-5 py-4 text-sm capitalize text-slate-600">{risk.status.replace('-', ' ')}</td>
								<td className="px-5 py-4">
									<ChevronRight className="h-4 w-4 text-slate-400" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default RiskTable;
