import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ProjectFinancialMetric } from '../analytics.types';

interface Props {
	data: ProjectFinancialMetric[];
}

function ProjectProfitabilityChart({ data }: Props) {
	// Top 8 projects for clean visual display
	const chartData = data.slice(0, 8).map((p) => ({
		name: p.projectName,
		Revenue: p.revenueGenerated,
		Cost: p.spent,
		Profit: p.grossProfit,
		margin: p.profitMargin,
	}));

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
			<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
				<div>
					<h3 className="text-base font-bold text-slate-900">Project Revenue vs Cost & Profitability</h3>
					<p className="text-xs text-slate-500">Commercial return and cost burn across leading enterprise deliverables (₹ Cr)</p>
				</div>
			</div>

			<div className="mt-6 h-[320px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
						<XAxis dataKey="name" interval={0} tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
						<YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 11 }} tickFormatter={(v) => `₹${v}Cr`} />
						<Tooltip
							contentStyle={{
								backgroundColor: '#0F172A',
								border: 'none',
								borderRadius: '12px',
								color: '#FFFFFF',
								fontSize: '12px',
								boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
							}}
							formatter={(value, name) => [`₹${value} Cr`, name]}
						/>
						<Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
						<Bar dataKey="Revenue" fill="#FFE600" radius={[4, 4, 0, 0]} />
						<Bar dataKey="Cost" fill="#64748B" radius={[4, 4, 0, 0]} />
						<Bar dataKey="Profit" fill="#10B981" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default ProjectProfitabilityChart;
