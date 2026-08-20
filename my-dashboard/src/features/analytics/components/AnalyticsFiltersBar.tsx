import { RotateCcw, Search } from 'lucide-react';
import type { AnalyticsFilters, BillingModel, PaymentStatus } from '../analytics.types';
import type { RiskSeverity } from '../../risks/risks.types';

interface Props {
	filters: AnalyticsFilters;
	onChange: (filters: AnalyticsFilters) => void;
	onReset: () => void;
}

function AnalyticsFiltersBar({ filters, onChange, onReset }: Props) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
				{/* Search Input */}
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
					<input
						value={filters.search}
						onChange={(e) => onChange({ ...filters, search: e.target.value })}
						placeholder="Search projects, clients..."
						className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-xs outline-none focus:border-slate-400 focus:bg-white"
					/>
				</div>

				{/* Risk Severity Filter */}
				<div>
					<select
						value={filters.riskSeverity}
						onChange={(e) => onChange({ ...filters, riskSeverity: e.target.value as RiskSeverity | 'all' })}
						className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none focus:border-slate-400"
					>
						<option value="all">All Risk Levels</option>
						<option value="critical">Critical Risk</option>
						<option value="high">High Risk</option>
						<option value="medium">Medium Risk</option>
						<option value="low">Low Risk</option>
					</select>
				</div>

				{/* Payment Status Filter */}
				<div>
					<select
						value={filters.paymentStatus}
						onChange={(e) => onChange({ ...filters, paymentStatus: e.target.value as PaymentStatus | 'all' })}
						className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none focus:border-slate-400"
					>
						<option value="all">All Payment Statuses</option>
						<option value="Paid">Paid (100%)</option>
						<option value="Partially Invoiced">Partially Invoiced</option>
						<option value="Pending Net-30">Pending Net-30</option>
						<option value="Overdue Net-60">Overdue Net-60</option>
					</select>
				</div>

				{/* Billing Model Filter */}
				<div>
					<select
						value={filters.billingModel}
						onChange={(e) => onChange({ ...filters, billingModel: e.target.value as BillingModel | 'all' })}
						className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none focus:border-slate-400"
					>
						<option value="all">All Billing Models</option>
						<option value="Milestone-Based">Milestone-Based</option>
						<option value="Monthly Retainer">Monthly Retainer</option>
						<option value="Time & Material">Time & Material</option>
						<option value="Fixed Fee">Fixed Fee</option>
					</select>
				</div>

				{/* Reset Button */}
				<div>
					<button
						type="button"
						onClick={onReset}
						className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100"
					>
						<RotateCcw className="h-3.5 w-3.5" />
						Reset Filters
					</button>
				</div>
			</div>
		</div>
	);
}

export default AnalyticsFiltersBar;
