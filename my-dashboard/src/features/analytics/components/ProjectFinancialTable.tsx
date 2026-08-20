import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowUpRight, Calendar, CheckCircle2, ChevronRight, Clock, FileBarChart } from 'lucide-react';
import type { BillingModel, PaymentStatus, ProjectFinancialMetric } from '../analytics.types';

interface Props {
	metrics: ProjectFinancialMetric[];
}

function getPaymentBadge(status: PaymentStatus) {
	switch (status) {
		case 'Paid':
			return {
				bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
				icon: <CheckCircle2 className="h-3 w-3" />,
			};
		case 'Partially Invoiced':
			return {
				bg: 'bg-sky-50 text-sky-700 border-sky-200',
				icon: <Clock className="h-3 w-3" />,
			};
		case 'Pending Net-30':
			return {
				bg: 'bg-amber-50 text-amber-700 border-amber-200',
				icon: <Clock className="h-3 w-3" />,
			};
		case 'Overdue Net-60':
			return {
				bg: 'bg-rose-50 text-rose-700 border-rose-200',
				icon: <AlertCircle className="h-3 w-3" />,
			};
	}
}

function getRiskBadge(severity: string) {
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
}

function getBillingBadge(model: BillingModel) {
	switch (model) {
		case 'Milestone-Based':
			return 'bg-slate-100 text-slate-800';
		case 'Monthly Retainer':
			return 'bg-purple-50 text-purple-700 border-purple-200';
		case 'Time & Material':
			return 'bg-blue-50 text-blue-700 border-blue-200';
		default:
			return 'bg-slate-50 text-slate-600';
	}
}

function ProjectFinancialTable({ metrics }: Props) {
	const navigate = useNavigate();

	const handleRowClick = (projectId: string) => {
		navigate(`/reports?projectId=${projectId}`);
	};

	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
			<div className="border-b border-slate-100 px-6 py-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
				<div>
					<h3 className="text-base font-bold text-slate-900">Project Commercial & Risk Matrix</h3>
					<p className="text-xs text-slate-500">
						Click on any project to view its dedicated executive infographic report and complete dossier.
					</p>
				</div>
				<span className="text-xs font-semibold text-slate-400">
					💡 Click any row to jump to Project Report
				</span>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
						<tr>
							<th className="px-6 py-3.5">Project & Client</th>
							<th className="px-6 py-3.5">Risk Exposure</th>
							<th className="px-6 py-3.5">Revenue / Cost</th>
							<th className="px-6 py-3.5">Profitability Margin</th>
							<th className="px-6 py-3.5">Client Billing Model</th>
							<th className="px-6 py-3.5">Payment & Invoicing</th>
							<th className="px-6 py-3.5 text-right">Report</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100 text-slate-700">
						{metrics.map((p) => {
							const paymentBadge = getPaymentBadge(p.paymentStatus);
							const riskBadge = getRiskBadge(p.riskSeverity);
							const billingBadge = getBillingBadge(p.billingModel);

							return (
								<tr
									key={p.projectId}
									onClick={() => handleRowClick(p.projectId)}
									className="hover:bg-slate-50 transition-colors cursor-pointer group"
								>
									{/* Project & Client */}
									<td className="px-6 py-4">
										<div>
											<p className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
												{p.projectName}
											</p>
											<div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
												<span className="font-mono text-slate-400">{p.code}</span>
												<span>•</span>
												<span className="font-medium text-slate-600">{p.client}</span>
											</div>
										</div>
									</td>

									{/* Risk Exposure */}
									<td className="px-6 py-4">
										<div>
											<span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-bold capitalize ${riskBadge}`}>
												{p.riskSeverity} Risk
											</span>
											<p className="mt-1 text-xs text-slate-500 max-w-[180px] truncate" title={p.riskTitle}>
												{p.riskTitle}
											</p>
										</div>
									</td>

									{/* Revenue / Cost */}
									<td className="px-6 py-4 font-medium text-slate-900">
										<div>
											<p className="font-bold text-slate-900">₹{p.revenueGenerated} Cr</p>
											<p className="text-xs text-slate-400">Cost: ₹{p.spent} Cr</p>
										</div>
									</td>

									{/* Profitability Margin */}
									<td className="px-6 py-4">
										<div>
											<div className="flex items-center gap-1 font-bold text-emerald-600">
												<ArrowUpRight className="h-3.5 w-3.5" />
												<span>{p.profitMargin}%</span>
											</div>
											<p className="mt-0.5 text-xs text-slate-500">₹{p.grossProfit} Cr Gross Profit</p>
										</div>
									</td>

									{/* Client Billing Model */}
									<td className="px-6 py-4">
										<div>
											<span className={`inline-flex items-center rounded-md border border-transparent px-2.5 py-1 text-xs font-semibold ${billingBadge}`}>
												{p.billingModel}
											</span>
											<p className="mt-1 text-[11px] text-slate-400">{p.paymentTerms}</p>
										</div>
									</td>

									{/* Payment & Invoicing */}
									<td className="px-6 py-4">
										<div>
											<span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${paymentBadge.bg}`}>
												{paymentBadge.icon}
												{p.paymentStatus}
											</span>
											<div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
												<Calendar className="h-3 w-3 text-slate-400" />
												<span>Due: {p.nextMilestoneDueDate}</span>
											</div>
										</div>
									</td>

									{/* Action Icon / View Report */}
									<td className="px-6 py-4 text-right">
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												handleRowClick(p.projectId);
											}}
											className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
										>
											<FileBarChart className="h-3.5 w-3.5 text-amber-500" />
											<span>View Report</span>
											<ChevronRight className="h-3 w-3 text-slate-400 group-hover:text-white" />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ProjectFinancialTable;
