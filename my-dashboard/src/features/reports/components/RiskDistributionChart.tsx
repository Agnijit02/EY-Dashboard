import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { RiskDistribution } from '../reports.types';

interface Props {
	data: RiskDistribution[];
}

function RiskDistributionChart({ data }: Props) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
			<h2 className="text-sm font-semibold text-slate-900">Risk Distribution</h2>
			<p className="mt-1 text-xs text-slate-500">Current risk exposure by severity.</p>

			<div className="mt-6 h-[280px]">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie data={data} dataKey="count" nameKey="severity" innerRadius={65} outerRadius={95} paddingAngle={3}>
							{data.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill="currentColor"
									className={index === 0 ? 'text-slate-200' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-slate-600' : 'text-slate-900'}
								/>
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
				{data.map((item) => (
					<div key={item.severity} className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full bg-slate-500" />
						<span className="capitalize text-slate-500">{item.severity}</span>
						<span className="font-medium text-slate-900">{item.count}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default RiskDistributionChart;
