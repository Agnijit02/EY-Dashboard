import { RotateCcw } from 'lucide-react';
import { Select } from '../../../components/common/Select';
import {
  DATE_RANGE_OPTIONS,
  DEPARTMENT_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  REGION_OPTIONS,
} from '../../../types/filters';
import type { DateRange, Department, ProjectStatus, Region } from '../../../types/filters';
import { useFilterStore } from '../../../store/filterStore';

function DashboardFilters() {
  const dateRange = useFilterStore((state) => state.dateRange);
  const region = useFilterStore((state) => state.region);
  const department = useFilterStore((state) => state.department);
  const projectStatus = useFilterStore((state) => state.projectStatus);
  const setDateRange = useFilterStore((state) => state.setDateRange);
  const setRegion = useFilterStore((state) => state.setRegion);
  const setDepartment = useFilterStore((state) => state.setDepartment);
  const setProjectStatus = useFilterStore((state) => state.setProjectStatus);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const hasActiveFilters =
    dateRange !== '90d' || region !== 'all' || department !== 'all' || projectStatus !== 'all';

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)] backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Filters</p>
            {hasActiveFilters ? (
              <span className="flex items-center gap-1.5 rounded-lg bg-[#FFE600]/10 px-2 py-0.5 text-[10px] font-semibold text-[#8a7d00]">
                <span className="animate-dot-pulse h-1.5 w-1.5 rounded-full bg-[#FFE600]" />
                Active
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-[13px] text-slate-500">Narrow the portfolio view by operational context.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Select id="date-range" label="Period" value={dateRange} onChange={(event) => setDateRange(event.target.value as DateRange)}>
            {DATE_RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select id="region" label="Region" value={region} onChange={(event) => setRegion(event.target.value as Region)}>
            {REGION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select id="department" label="Department" value={department} onChange={(event) => setDepartment(event.target.value as Department)}>
            {DEPARTMENT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select id="project-status" label="Project Status" value={projectStatus} onChange={(event) => setProjectStatus(event.target.value as ProjectStatus)}>
            {PROJECT_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

export default DashboardFilters;