import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ProjectPerformance } from '../reports.types';

interface Props {
	data: ProjectPerformance[];
}

function ProjectPerformanceChart({ data }: Props) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
			<h2 className="text-sm font-semibold text-slate-900">Project Completion</h2>
			<p className="mt-1 text-xs text-slate-500">Delivery progress across active projects.</p>

			<div className="mt-6 h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data}>
						<XAxis dataKey="projectName" axisLine={false} tickLine={false} fontSize={11} />
						<YAxis domain={[0, 100]} axisLine={false} tickLine={false} fontSize={12} />
						<Tooltip />
						<Bar dataKey="completion" fill="currentColor" radius={[4, 4, 0, 0]} className="text-slate-800" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default ProjectPerformanceChart;
