import { FolderOpen } from 'lucide-react';
import type { Project } from '../projects.types';
import ProjectProgress from './ProjectProgress';
import ProjectStatusBadge from './ProjectStatusBadge';

interface ProjectTableProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

function ProjectTable({ projects, onProjectClick }: ProjectTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Project</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Client</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Manager</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Budget</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Progress</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => (
              <tr key={project.id} onClick={() => onProjectClick(project)} className="cursor-pointer transition-colors hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <FolderOpen className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-900">{project.name}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{project.code}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">{project.client}</td>

                <td className="px-5 py-4">
                  <p className="text-sm text-slate-700">{project.manager}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{project.department}</p>
                </td>

                <td className="px-5 py-4">
                  <ProjectStatusBadge status={project.status} />
                </td>

                <td className="px-5 py-4 text-sm font-medium text-slate-800">₹{project.budget} Cr</td>

                <td className="px-5 py-4">
                  <ProjectProgress value={project.progress} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectTable;