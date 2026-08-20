import { AlertTriangle, ArrowUpRight, CheckCircle2, DollarSign, Percent, TrendingUp } from 'lucide-react';
import type { PortfolioAnalyticsSummary } from '../analytics.types';

interface AnalyticsKpiCardsProps {
	summary: PortfolioAnalyticsSummary;
}

function AnalyticsKpiCards({ summary }: AnalyticsKpiCardsProps) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{/* Total Portfolio Revenue */}
			<div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
				<div className="flex items-center justify-between">
					<span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tracked Revenue</span>
					<div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
						<DollarSign className="h-5 w-5 text-[#B89000]" />
					</div>
				</div>
				<div className="mt-3">
					<h3 className="text-2xl font-extrabold tracking-tight text-slate-900">₹{summary.totalRevenue} Cr</h3>
					<p className="mt-1 flex items-center text-xs font-medium text-emerald-600">
						<ArrowUpRight className="mr-1 h-3.5 w-3.5" />
						From ₹{summary.totalBudget} Cr total booked budget
					</p>
				</div>
			</div>

			{/* Realized Gross Profit & Margin */}
			<div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
				<div className="flex items-center justify-between">
					<span className="text-xs font-bold uppercase tracking-wider text-slate-400">Realized Profit</span>
					<div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
						<TrendingUp className="h-5 w-5" />
					</div>
				</div>
				<div className="mt-3">
					<h3 className="text-2xl font-extrabold tracking-tight text-slate-900">₹{summary.totalProfit} Cr</h3>
					<p className="mt-1 flex items-center text-xs font-medium text-emerald-600">
						<Percent className="mr-1 h-3.5 w-3.5" />
						{summary.averageMargin}% average gross profit margin
					</p>
				</div>
			</div>

			{/* Collections vs Receivables */}
			<div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
				<div className="flex items-center justify-between">
					<span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cash Collections</span>
					<div className="rounded-xl bg-sky-50 p-2.5 text-sky-600">
						<CheckCircle2 className="h-5 w-5" />
					</div>
				</div>
				<div className="mt-3">
					<h3 className="text-2xl font-extrabold tracking-tight text-slate-900">₹{summary.totalCollected} Cr</h3>
					<p className="mt-1 text-xs font-medium text-slate-500">
						₹{summary.totalPending} Cr pending client receivables
					</p>
				</div>
			</div>

			{/* Risk & Overdue Invoices Flag */}
			<div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
				<div className="flex items-center justify-between">
					<span className="text-xs font-bold uppercase tracking-wider text-slate-400">Payment Risk Signals</span>
					<div className="rounded-xl bg-rose-50 p-2.5 text-rose-600">
						<AlertTriangle className="h-5 w-5" />
					</div>
				</div>
				<div className="mt-3">
					<h3 className="text-2xl font-extrabold tracking-tight text-rose-600">
						{summary.overdueInvoicesCount} Overdue
					</h3>
					<p className="mt-1 text-xs font-medium text-slate-500">
						{summary.highRiskProjectCount} high/critical risk engagements
					</p>
				</div>
			</div>
		</div>
	);
}

export default AnalyticsKpiCards;
