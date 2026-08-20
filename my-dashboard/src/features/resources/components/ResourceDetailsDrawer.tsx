import {
	Briefcase,
	Clock3,
	DollarSign,
	Mail,
	MapPin,
	Sparkles,
	X,
} from 'lucide-react';
import { Drawer } from '../../../components/common/Drawer';
import type { Resource } from '../resources.types';
import ResourceStatusBadge from './ResourceStatusBadge';

interface ResourceDetailsDrawerProps {
	resource: Resource | null;
	onClose: () => void;
}

function ResourceDetailsDrawer({ resource, onClose }: ResourceDetailsDrawerProps) {
	if (!resource) {
		return null;
	}

	const projectCount = resource.assignedProjects.length;
	const skillsList = resource.skills.slice(0, 2).join(' and ') || 'Strategic Consulting';

	let summaryText: string;
	if (projectCount > 0) {
		summaryText = `This consultant is actively staffed across ${projectCount} client engagement(s), with core competencies in ${skillsList}.`;
	} else if (resource.allocationPercentage > 0) {
		summaryText = `This consultant has an allocated workload of ${resource.allocationPercentage}% committed to practice initiatives and technical delivery, with core competencies in ${skillsList}.`;
	} else {
		summaryText = `This consultant has 100% bench availability and is ready to be staffed on upcoming client engagements, with core competencies in ${skillsList}.`;
	}

	return (
		<Drawer open={Boolean(resource)} onClose={onClose} title={resource.name}>
			<div className="px-1">
				<div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
					<div>
						<p className="text-xs font-medium text-slate-400">{resource.role}</p>
						<h2 className="mt-1 text-xl font-semibold text-slate-900">{resource.name}</h2>
						<p className="mt-1 text-sm font-medium text-slate-500">{resource.department}</p>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
						aria-label="Close"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<div className="py-5">
					<ResourceStatusBadge status={resource.availabilityStatus} />

					<p className="mt-4 text-sm leading-6 text-slate-600">
						{summaryText}
					</p>

					<div className="mt-7 grid grid-cols-2 gap-3">
						<div className="rounded-xl border border-slate-200 p-4">
							<DollarSign className="h-5 w-5 text-emerald-600" />
							<p className="mt-3 text-xs text-slate-400">Billable Rate</p>
							<p className="mt-1 text-xl font-bold text-slate-900">₹{resource.billableRate}/hr</p>
						</div>

						<div className="rounded-xl border border-slate-200 p-4">
							<Briefcase className="h-5 w-5 text-blue-600" />
							<p className="mt-3 text-xs text-slate-400">Workload Allocation</p>
							<p className="mt-1 text-xl font-bold text-slate-900">{resource.allocationPercentage}%</p>
						</div>
					</div>

					<div className="mt-7">
						<h3 className="text-sm font-semibold text-slate-900">Resource Details</h3>
						<dl className="mt-3 divide-y divide-slate-100 border-y border-slate-100">
							<div className="flex justify-between gap-4 py-3">
								<dt className="flex items-center gap-2 text-sm text-slate-500">
									<Mail className="h-4 w-4 text-slate-400" />
									Email
								</dt>
								<dd className="text-right text-sm font-medium text-slate-900">{resource.email}</dd>
							</div>

							<div className="flex justify-between gap-4 py-3">
								<dt className="flex items-center gap-2 text-sm text-slate-500">
									<MapPin className="h-4 w-4 text-slate-400" />
									Location
								</dt>
								<dd className="text-right text-sm font-medium text-slate-900">{resource.location}</dd>
							</div>

							<div className="flex justify-between gap-4 py-3">
								<dt className="flex items-center gap-2 text-sm text-slate-500">
									<Clock3 className="h-4 w-4 text-slate-400" />
									Experience
								</dt>
								<dd className="text-right text-sm font-medium text-slate-900">{resource.experience} years</dd>
							</div>
						</dl>
					</div>

					<div className="mt-7">
						<h3 className="text-sm font-semibold text-slate-900">Assigned Projects</h3>
						<div className="mt-3 flex flex-wrap gap-2">
							{resource.assignedProjects.length > 0 ? (
								resource.assignedProjects.map((project) => (
									<span
										key={project}
										className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
									>
										{project}
									</span>
								))
							) : (
								<p className="text-xs text-slate-400">No individual projects assigned yet. Ready for project staffing.</p>
							)}
						</div>
					</div>

					<div className="mt-7">
						<h3 className="text-sm font-semibold text-slate-900">Core Skills</h3>
						<div className="mt-3 flex flex-wrap gap-2">
							{resource.skills.map((skill) => (
								<span
									key={skill}
									className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
								>
									<Sparkles className="h-3 w-3 text-sky-600" />
									{skill}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</Drawer>
	);
}

export default ResourceDetailsDrawer;