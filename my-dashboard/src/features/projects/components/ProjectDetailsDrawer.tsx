import { CalendarDays, CircleDollarSign, X, Users, Lock } from 'lucide-react';
import { Drawer } from '../../../components/common/Drawer';
import { useAuth } from '../../../hooks/useAuth';
import type { Project } from '../projects.types';
import ProjectProgress from './ProjectProgress';
import ProjectStatusBadge from './ProjectStatusBadge';

interface ProjectDetailsDrawerProps {
	project: Project | null;
	onClose: () => void;
	onEdit: (project: Project) => void;
	onDelete: (project: Project) => void;
}

function ProjectDetailsDrawer({ project, onClose, onEdit, onDelete }: ProjectDetailsDrawerProps) {
	const { canManage, isAdmin } = useAuth();

	if (!project) {
		return null;
	}

	return (
		<Drawer open={Boolean(project)} onClose={onClose} title={project.name}>
			<div className="px-1">
				<div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
					<div>
						<p className="text-xs font-medium text-slate-400">{project.code}</p>
						<h2 className="mt-1 text-xl font-semibold text-slate-900">{project.name}</h2>
						<p className="mt-1 text-sm text-slate-500">{project.client}</p>
					</div>

					<button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
						<X className="h-5 w-5" />
					</button>
				</div>

				<div className="py-5">
					<ProjectStatusBadge status={project.status} />

					<p className="mt-4 text-sm leading-6 text-slate-600">{project.description}</p>

					<div className="mt-7">
						<h3 className="text-sm font-semibold text-slate-900">Delivery Progress</h3>
						<div className="mt-4">
							<ProjectProgress value={project.progress} />
						</div>
					</div>

					<div className="mt-7 grid grid-cols-2 gap-3">
						<div className="rounded-xl border border-slate-200 p-4">
							<CircleDollarSign className="h-5 w-5 text-slate-500" />
							<p className="mt-3 text-xs text-slate-400">Budget</p>
							<p className="mt-1 text-lg font-semibold text-slate-900">₹{project.budget} Cr</p>
						</div>

						<div className="rounded-xl border border-slate-200 p-4">
							<CircleDollarSign className="h-5 w-5 text-slate-500" />
							<p className="mt-3 text-xs text-slate-400">Spent</p>
							<p className="mt-1 text-lg font-semibold text-slate-900">₹{project.spent} Cr</p>
						</div>

						<div className="rounded-xl border border-slate-200 p-4">
							<Users className="h-5 w-5 text-slate-500" />
							<p className="mt-3 text-xs text-slate-400">Team Size</p>
							<p className="mt-1 text-lg font-semibold text-slate-900">{project.teamSize}</p>
						</div>

						<div className="rounded-xl border border-slate-200 p-4">
							<CalendarDays className="h-5 w-5 text-slate-500" />
							<p className="mt-3 text-xs text-slate-400">End Date</p>
							<p className="mt-1 text-sm font-semibold text-slate-900">{project.endDate}</p>
						</div>
					</div>

					<div className="mt-7">
						<h3 className="text-sm font-semibold text-slate-900">Project Information</h3>

						<dl className="mt-3 divide-y divide-slate-100 border-y border-slate-100">
							<div className="flex justify-between py-3">
								<dt className="text-sm text-slate-500">Manager</dt>
								<dd className="text-sm font-medium text-slate-900">{project.manager}</dd>
							</div>

							<div className="flex justify-between py-3">
								<dt className="text-sm text-slate-500">Region</dt>
								<dd className="text-sm font-medium capitalize text-slate-900">{project.region}</dd>
							</div>

							<div className="flex justify-between py-3">
								<dt className="text-sm text-slate-500">Department</dt>
								<dd className="text-sm font-medium text-slate-900">{project.department}</dd>
							</div>

							<div className="flex justify-between py-3">
								<dt className="text-sm text-slate-500">Start Date</dt>
								<dd className="text-sm font-medium text-slate-900">{project.startDate}</dd>
							</div>
						</dl>
					</div>

					{/* Edit & Delete actions / Read-only state */}
					{canManage ? (
						<div className="mt-8 flex gap-3 border-t border-slate-200 pt-5">
							<button
								type="button"
								onClick={() => onEdit(project)}
								className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
							>
								Edit Project
							</button>

							{isAdmin && (
								<button
									type="button"
									onClick={() => onDelete(project)}
									className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
								>
									Delete
								</button>
							)}
						</div>
					) : (
						<div className="mt-8 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
							<Lock className="h-4 w-4 text-slate-400" />
							<span>View-only mode: Project editing is restricted to Managers and Administrators.</span>
						</div>
					)}
				</div>
			</div>
		</Drawer>
	);
}

export default ProjectDetailsDrawer;