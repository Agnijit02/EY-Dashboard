import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { ReportKPI } from '../reports.types';

interface Props {
	kpis: ReportKPI[];
}

function ReportKpiCards({ kpis }: Props) {
	return (
		<div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
			{kpis.map((kpi) => {
				const positive = kpi.change >= 0;

				return (
					<div key={kpi.label} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
						<div className="h-1 bg-[linear-gradient(90deg,#FFE600_0%,#1A1A1A_100%)]" />
						<div className="p-5">
							<p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{kpi.label}</p>

							<div className="mt-3 flex items-end justify-between gap-3">
								<p className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">{kpi.value}</p>

								<div className="flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700">
								  {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
								  {Math.abs(kpi.change)}%
								</div>
							</div>

							<p className="mt-2 text-xs text-slate-400">vs previous period</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ReportKpiCards;
