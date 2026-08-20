import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { RevenuePoint } from '../reports.types';

interface Props {
	data: RevenuePoint[];
}

function RevenueTrendChart({ data }: Props) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
			<div>
				<h2 className="text-sm font-semibold text-slate-900">Revenue Trend</h2>
				<p className="mt-1 text-xs text-slate-500">Actual revenue compared with target.</p>
			</div>

			<div className="mt-6 h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
						<YAxis axisLine={false} tickLine={false} fontSize={12} />
						<Tooltip />
						<Line type="monotone" dataKey="revenue" stroke="currentColor" strokeWidth={2} dot={false} className="text-slate-900" />
						<Line type="monotone" dataKey="target" stroke="currentColor" strokeWidth={1.5} strokeDasharray="5 5" dot={false} className="text-slate-300" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default RevenueTrendChart;
