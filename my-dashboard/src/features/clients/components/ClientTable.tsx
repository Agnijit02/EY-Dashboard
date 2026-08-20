import { Building2 } from 'lucide-react';
import type { Client } from '../clients.types';
import ClientStatusBadge from './ClientStatusBadge';

interface ClientTableProps {
	clients: Client[];
	onClientClick: (client: Client) => void;
}

function ClientTable({ clients, onClientClick }: ClientTableProps) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full text-left text-sm text-slate-600">
				<thead className="bg-slate-50 text-xs uppercase text-slate-400">
					<tr>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Client Name
						</th>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Industry
						</th>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Status
						</th>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Active Projects
						</th>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Total Revenue
						</th>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Account Manager
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100 bg-white">
					{clients.map((client) => (
						<tr
							key={client.id}
							onClick={() => onClientClick(client)}
							className="group cursor-pointer transition-colors hover:bg-slate-50/80"
						>
							<td className="px-6 py-4 font-medium text-slate-900">
								<div className="flex items-center gap-3">
									<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300 group-hover:bg-white">
										<Building2 className="h-4 w-4" />
									</div>
									<div>
										<p className="font-semibold text-slate-900 group-hover:text-blue-600">{client.name}</p>
										<p className="text-xs text-slate-400">{client.code}</p>
									</div>
								</div>
							</td>
							<td className="px-6 py-4">
								<span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
									{client.industry}
								</span>
							</td>
							<td className="px-6 py-4">
								<ClientStatusBadge status={client.status} />
							</td>
							<td className="px-6 py-4 font-medium text-slate-900">{client.activeProjects} Projects</td>
							<td className="px-6 py-4 font-semibold text-slate-900">₹{client.totalRevenue} Cr</td>
							<td className="px-6 py-4 text-slate-600">{client.accountManager}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ClientTable;