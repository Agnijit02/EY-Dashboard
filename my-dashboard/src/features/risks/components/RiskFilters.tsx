import { Search, X } from 'lucide-react';
import type { RiskFilters as RiskFiltersType } from '../risks.types';

interface RiskFiltersProps {
	filters: RiskFiltersType;
	onChange: (value: RiskFiltersType) => void;
}

function RiskFilters({ filters, onChange }: RiskFiltersProps) {
	const hasFilters =
		filters.search !== '' || filters.severity !== 'all' || filters.status !== 'all' || filters.category !== 'all';

	return (
		<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
			<div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto_auto]">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
					<input
						value={filters.search}
						onChange={(event) => onChange({ ...filters, search: event.target.value })}
						placeholder="Search risks..."
						className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-slate-100"
					/>
				</div>

				<select
					value={filters.severity}
					onChange={(event) => onChange({ ...filters, severity: event.target.value as RiskFiltersType['severity'] })}
					className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700"
				>
					<option value="all">All Severity</option>
					<option value="critical">Critical</option>
					<option value="high">High</option>
					<option value="medium">Medium</option>
					<option value="low">Low</option>
				</select>

				<select
					value={filters.status}
					onChange={(event) => onChange({ ...filters, status: event.target.value as RiskFiltersType['status'] })}
					className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700"
				>
					<option value="all">All Status</option>
					<option value="open">Open</option>
					<option value="monitoring">Monitoring</option>
					<option value="mitigated">Mitigated</option>
					<option value="closed">Closed</option>
				</select>

				<select
					value={filters.category}
					onChange={(event) => onChange({ ...filters, category: event.target.value as RiskFiltersType['category'] })}
					className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700"
				>
					<option value="all">All Categories</option>
					<option value="technical">Technical</option>
					<option value="financial">Financial</option>
					<option value="operational">Operational</option>
					<option value="security">Security</option>
					<option value="resource">Resource</option>
					<option value="compliance">Compliance</option>
				</select>

				{hasFilters ? (
					<button
						type="button"
						onClick={() => onChange({ search: '', severity: 'all', status: 'all', category: 'all' })}
						className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-sm text-slate-500 hover:bg-slate-50"
					>
						<X className="h-4 w-4" />
						Clear
					</button>
				) : null}
			</div>
		</div>
	);
}

export default RiskFilters;
