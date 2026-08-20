import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ResourceUtilization } from '../reports.types';

interface Props {
	data: ResourceUtilization[];
}

function ResourceUtilizationChart({ data }: Props) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
			<h2 className="text-sm font-semibold text-slate-900">Resource Utilization</h2>
			<p className="mt-1 text-xs text-slate-500">Average allocation by department.</p>

			<div className="mt-6 h-[280px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data} layout="vertical">
						<XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} fontSize={11} />
						<YAxis type="category" dataKey="department" axisLine={false} tickLine={false} fontSize={11} width={90} />
						<Tooltip />
						<Bar dataKey="utilization" fill="currentColor" radius={[0, 4, 4, 0]} className="text-slate-700" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default ResourceUtilizationChart;
