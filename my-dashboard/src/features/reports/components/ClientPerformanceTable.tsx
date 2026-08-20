import type { ClientPerformance } from '../reports.types';

interface Props {
	data: ClientPerformance[];
}

function ClientPerformanceTable({ data }: Props) {
	return (
		<div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
			<div className="border-b border-slate-200 px-6 py-5">
				<p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Customer portfolio</p>
				<h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">Client Performance</h2>
				<p className="mt-1 text-sm text-slate-500">Revenue and project contribution by client.</p>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full min-w-[700px]">
					<thead className="border-b border-slate-200 bg-slate-50">
						<tr>
							<th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Client</th>
							<th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Projects</th>
							<th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Revenue</th>
							<th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Health</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-slate-100">
						{data.map((client) => (
							<tr key={client.clientId} className="hover:bg-slate-50">
								<td className="px-6 py-4 text-sm font-semibold text-slate-950">{client.clientName}</td>
								<td className="px-6 py-4 text-sm text-slate-600">{client.projects}</td>
								<td className="px-6 py-4 text-sm font-semibold text-slate-950">₹{client.revenue.toFixed(1)} Cr</td>
								<td className="px-6 py-4">
									<span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium capitalize text-slate-700">
										<span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]" />
										{client.health.replace('-', ' ')}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ClientPerformanceTable;
