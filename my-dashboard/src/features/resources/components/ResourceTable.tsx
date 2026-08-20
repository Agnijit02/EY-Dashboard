import { Mail } from 'lucide-react';
import type { Resource } from '../resources.types';
import ResourceAllocationBar from './ResourceAllocationBar';
import ResourceStatusBadge from './ResourceStatusBadge';

interface ResourceTableProps {
	resources: Resource[];
	onResourceClick: (resource: Resource) => void;
}

function ResourceTable({ resources, onResourceClick }: ResourceTableProps) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full text-left text-sm text-slate-600">
				<thead className="bg-slate-50 text-xs uppercase text-slate-400">
					<tr>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Resource
						</th>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Department
						</th>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Role
						</th>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Skills
						</th>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Allocation
						</th>
						<th scope="col" className="px-6 py-3.5 font-medium">
							Status
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100 bg-white">
					{resources.map((resource) => {
						const initials = resource.name
							.split(' ')
							.map((part) => part[0])
							.slice(0, 2)
							.join('')
							.toUpperCase();

						return (
							<tr
								key={resource.id}
								onClick={() => onResourceClick(resource)}
								className="group cursor-pointer transition-colors hover:bg-slate-50/80"
							>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700">
											{initials}
										</div>
										<div>
											<p className="font-semibold text-slate-900 group-hover:text-blue-600">{resource.name}</p>
											<div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
												<Mail className="h-3 w-3" />
												<span>{resource.email}</span>
											</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4 text-slate-700">{resource.department}</td>
								<td className="px-6 py-4 text-slate-700">{resource.role}</td>
								<td className="px-6 py-4">
									<div className="flex flex-wrap gap-1.5">
										{resource.skills.slice(0, 3).map((skill) => (
											<span
												key={skill}
												className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600"
											>
												{skill}
											</span>
										))}
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="min-w-[150px]">
										<ResourceAllocationBar value={resource.allocationPercentage} />
									</div>
								</td>
								<td className="px-6 py-4">
									<ResourceStatusBadge status={resource.availabilityStatus} />
								</td>
							</tr>
						);
						})}
				</tbody>
			</table>
		</div>
	);
}

export default ResourceTable;
