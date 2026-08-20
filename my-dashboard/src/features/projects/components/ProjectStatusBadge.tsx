import type { ProjectStatus } from '../projects.types';

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-emerald-50 text-emerald-700' },
  completed: { label: 'Completed', className: 'bg-slate-100 text-slate-700' },
  'at-risk': { label: 'At Risk', className: 'bg-amber-50 text-amber-700' },
  delayed: { label: 'Delayed', className: 'bg-red-50 text-red-700' },
};

function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}

export default ProjectStatusBadge;