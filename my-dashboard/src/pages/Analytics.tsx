import { useMemo, useState } from 'react';
import { Download, Sparkles } from 'lucide-react';
import AnalyticsFiltersBar from '../features/analytics/components/AnalyticsFiltersBar';
import AnalyticsKpiCards from '../features/analytics/components/AnalyticsKpiCards';
import ProjectFinancialTable from '../features/analytics/components/ProjectFinancialTable';
import ProjectProfitabilityChart from '../features/analytics/components/ProjectProfitabilityChart';
import {
	computePortfolioAnalyticsSummary,
	filterAnalyticsMetrics,
	getProjectFinancialMetrics,
} from '../features/analytics/analytics.service';
import type { AnalyticsFilters } from '../features/analytics/analytics.types';

const defaultFilters: AnalyticsFilters = {
	search: '',
	riskSeverity: 'all',
	paymentStatus: 'all',
	billingModel: 'all',
	department: 'all',
};

function Analytics() {
	const [filters, setFilters] = useState<AnalyticsFilters>(defaultFilters);

	// Load all metrics
	const allMetrics = useMemo(() => getProjectFinancialMetrics(), []);
	const summary = useMemo(() => computePortfolioAnalyticsSummary(allMetrics), [allMetrics]);
	const filteredMetrics = useMemo(
		() => filterAnalyticsMetrics(allMetrics, filters),
		[allMetrics, filters],
	);

	const handleExportAnalyticsCSV = () => {
		const headers = [
			'Project Name',
			'Code',
			'Client',
			'Department',
			'Budget (Cr)',
			'Spent (Cr)',
			'Revenue Generated (Cr)',
			'Gross Profit (Cr)',
			'Profit Margin (%)',
			'Risk Severity',
			'Risk Title',
			'Billing Model',
			'Payment Status',
			'Payment Terms',
			'Due Date',
		];

		const rows = filteredMetrics.map((m) => [
			`"${m.projectName}"`,
			`"${m.code}"`,
			`"${m.client}"`,
			`"${m.department}"`,
			m.budget,
			m.spent,
			m.revenueGenerated,
			m.grossProfit,
			`${m.profitMargin}%`,
			`"${m.riskSeverity}"`,
			`"${m.riskTitle}"`,
			`"${m.billingModel}"`,
			`"${m.paymentStatus}"`,
			`"${m.paymentTerms}"`,
			`"${m.nextMilestoneDueDate}"`,
		]);

		const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('download', `EY_Project_Financial_Analytics_${Date.now()}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<div className="flex items-center gap-2">
						<span className="inline-flex items-center gap-1 rounded-full bg-[#FFE600]/20 px-2.5 py-0.5 text-xs font-bold text-slate-900 border border-[#FFE600]/40">
							<Sparkles className="h-3 w-3 text-[#A88200]" />
							Commercial Intelligence
						</span>
					</div>
					<h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
						Financial & Risk Analytics
					</h1>
					<p className="mt-1 text-sm text-slate-500">
						Project-wise revenue generation, profit margins, client payment milestones, and risk exposure.
					</p>
				</div>

				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={handleExportAnalyticsCSV}
						className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800"
					>
						<Download className="h-3.5 w-3.5" />
						Export Analytics CSV
					</button>
				</div>
			</section>

			{/* KPI Metric Summary Cards */}
			<AnalyticsKpiCards summary={summary} />

			{/* Interactive Bar Chart */}
			<ProjectProfitabilityChart data={filteredMetrics} />

			{/* Filter Controls */}
			<AnalyticsFiltersBar
				filters={filters}
				onChange={setFilters}
				onReset={() => setFilters(defaultFilters)}
			/>

			{/* Results Summary Count */}
			<div className="flex items-center justify-between">
				<p className="text-xs font-semibold text-slate-500">
					Showing <span className="font-bold text-slate-900">{filteredMetrics.length}</span> of {allMetrics.length} project engagements
				</p>
			</div>

			{/* Comprehensive Commercial & Risk Matrix Table */}
			<ProjectFinancialTable metrics={filteredMetrics} />
		</div>
	);
}

export default Analytics;