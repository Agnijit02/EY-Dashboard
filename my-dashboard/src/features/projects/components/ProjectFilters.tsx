import { RotateCcw } from 'lucide-react';
import { Input } from '../../../components/common/Input';
import { useProjectsStore } from '../../../store/projectsStore';
import type { ProjectRegion, ProjectStatus } from '../projects.types';

const managers = ['all', 'Rahul Sharma', 'Priya Mehta', 'Arjun Das', 'Sneha Kapoor', 'Vikram Singh'];

function ProjectFilters() {
  const filters = useProjectsStore((state) => state.filters);
  const setSearch = useProjectsStore((state) => state.setSearch);
  const setStatus = useProjectsStore((state) => state.setStatus);
  const setRegion = useProjectsStore((state) => state.setRegion);
  const setManager = useProjectsStore((state) => state.setManager);
  const resetFilters = useProjectsStore((state) => state.resetFilters);

  const hasFilters = filters.search !== '' || filters.status !== 'all' || filters.region !== 'all' || filters.manager !== 'all';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Input
            label="Search"
            id="project-search"
            type="search"
            value={filters.search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects..."
          />
        </div>

        <div>
          <label htmlFor="project-status" className="mb-1.5 block text-xs font-medium text-slate-500">
            Status
          </label>
          <select id="project-status" value={filters.status} onChange={(event) => setStatus(event.target.value as ProjectStatus | 'all')} className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100">
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="at-risk">At Risk</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>

        <div>
          <label htmlFor="project-region" className="mb-1.5 block text-xs font-medium text-slate-500">
            Region
          </label>
          <select id="project-region" value={filters.region} onChange={(event) => setRegion(event.target.value as ProjectRegion | 'all')} className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100">
            <option value="all">All Regions</option>
            <option value="india">India</option>
            <option value="europe">Europe</option>
            <option value="americas">Americas</option>
            <option value="apac">APAC</option>
          </select>
        </div>

        <div>
          <label htmlFor="project-manager" className="mb-1.5 block text-xs font-medium text-slate-500">
            Manager
          </label>
          <select id="project-manager" value={filters.manager} onChange={(event) => setManager(event.target.value)} className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100">
            {managers.map((manager) => (
              <option key={manager} value={manager}>
                {manager === 'all' ? 'All Managers' : manager}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasFilters ? (
        <div className="mt-3 flex justify-end">
          <button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset filters
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ProjectFilters;