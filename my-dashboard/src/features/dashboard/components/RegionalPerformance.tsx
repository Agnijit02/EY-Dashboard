import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, Building, CheckCircle2, Clock, Globe, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { RegionalPerformanceData } from '../dashboard.types';
import { useProjectsStore } from '../../../store/projectsStore';

interface RegionalPerformanceProps {
  data: RegionalPerformanceData[];
}

function CustomRegionalTooltip({ active, payload, onNavigate }: any) {
  if (!active || !payload || !payload.length) return null;
  const regionData = payload[0]?.payload as RegionalPerformanceData | undefined;
  if (!regionData) return null;

  const projects = regionData.projects || [];
  const topProjects = projects.slice(0, 3);
  const topProjectsBudget = topProjects.reduce((sum, p) => sum + (Number(p.budget) || 0), 0);
  const remainingCount = projects.length - topProjects.length;
  const remainingBudget = Number(Math.max(0, regionData.revenue - topProjectsBudget).toFixed(1));

  const completedCount = projects.filter((p) => p.status === 'completed').length;
  const activeCount = projects.filter((p) => p.status === 'active').length;
  const atRiskCount = projects.filter((p) => p.status === 'at-risk').length;
  const delayedCount = projects.filter((p) => p.status === 'delayed').length;

  return (
    <div
      className="pointer-events-auto z-50 w-84 rounded-2xl border-2 border-slate-800 bg-[#141414] p-4 text-white shadow-2xl backdrop-blur-md"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="border-b border-slate-800 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFE600] text-slate-950 font-black text-xs">
              <Globe className="h-4 w-4 text-slate-950" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold tracking-tight text-white">{regionData.region} Region</h4>
              <p className="text-[11px] text-slate-400 font-medium">{projects.length} Total Projects</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-extrabold text-[#FFE600]">₹{regionData.revenue} Cr</span>
            <p className="text-[10px] text-slate-400">Total Portfolio</p>
          </div>
        </div>

        {/* Quick Status Chips */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10px] font-semibold">
          {activeCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-sky-500/20 px-2 py-0.5 text-sky-300 border border-sky-500/30">
              <Clock className="h-3 w-3" />
              {activeCount} Active
            </span>
          )}
          {completedCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-0.5 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="h-3 w-3" />
              {completedCount} Done
            </span>
          )}
          {atRiskCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 text-amber-300 border border-amber-500/30">
              <ShieldAlert className="h-3 w-3" />
              {atRiskCount} At-Risk
            </span>
          )}
          {delayedCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/20 px-2 py-0.5 text-rose-300 border border-rose-500/30">
              <ShieldAlert className="h-3 w-3" />
              {delayedCount} Delayed
            </span>
          )}
        </div>
      </div>

      {/* Top 3 Projects List */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span>Featured Projects ({topProjects.length} of {projects.length})</span>
          <span className="text-[#FFE600]">Budget / Status</span>
        </div>

        <div className="mt-2 space-y-1.5">
          {topProjects.length === 0 ? (
            <p className="py-2 text-center text-xs italic text-slate-500">No projects matching active filters.</p>
          ) : (
            topProjects.map((p) => {
              const statusColor =
                p.status === 'completed'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : p.status === 'active'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  : p.status === 'at-risk'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

              return (
                <div
                  key={p.id}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-2.5 text-xs transition-colors hover:bg-white/[0.08]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate font-bold text-white">{p.name}</span>
                        <span className="font-mono text-[10px] text-slate-400">({p.code})</span>
                      </div>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                        <Building className="h-3 w-3 shrink-0 text-slate-500" />
                        <span className="truncate">{p.client}</span>
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-bold text-[#FFE600]">₹{p.budget} Cr</p>
                      <span className={`mt-0.5 inline-block rounded-md border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${statusColor}`}>
                        {p.status} ({p.progress}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* More Projects Callout & Redirect Link */}
        {remainingCount > 0 ? (
          <div className="mt-3 rounded-xl border border-[#FFE600]/30 bg-[#FFE600]/10 p-2.5 text-center">
            <p className="text-[11px] font-semibold text-slate-200">
              + <strong className="text-[#FFE600]">{remainingCount} more {remainingCount === 1 ? 'project' : 'projects'}</strong> in {regionData.region} (₹{remainingBudget} Cr)
            </p>
            <button
              type="button"
              onClick={() => onNavigate(regionData.region)}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#FFE600] py-2 text-xs font-extrabold text-slate-950 shadow-md transition-all hover:bg-yellow-400 active:scale-[0.98] cursor-pointer"
            >
              <span>View all {projects.length} projects in {regionData.region}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onNavigate(regionData.region)}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 py-2 text-xs font-bold text-[#FFE600] shadow-sm transition-all hover:bg-slate-700 active:scale-[0.98] cursor-pointer"
          >
            <span>Open {regionData.region} in Projects Table</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

function RegionalPerformance({ data }: RegionalPerformanceProps) {
  const navigate = useNavigate();
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 10);

  const handleNavigateToRegion = (regionName: string) => {
    const regionLower = regionName.toLowerCase();
    useProjectsStore.getState().setRegion(regionLower as any);
    navigate(`/projects?region=${regionLower}`);
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)]">
      <div className="border-b border-slate-200/60 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-700" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Regional breakdown</p>
            </div>
            <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900">Regional Performance</h2>
            <p className="mt-1 text-[13px] text-slate-500">Revenue by operating region • Hover or click a bar to inspect projects</p>
          </div>

          <span className="hidden sm:inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {data.reduce((sum, d) => sum + (d.projectCount || 0), 0)} Projects Total
          </span>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 40, top: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1A1A1A" />
                  <stop offset="100%" stopColor="#FFE600" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                domain={[0, Math.ceil(maxRevenue * 1.15)]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                tickFormatter={(value) => `₹${value}Cr`}
              />
              <YAxis
                type="category"
                dataKey="region"
                axisLine={false}
                tickLine={false}
                width={75}
                tick={{ fontSize: 12, fill: '#1E293B', fontWeight: 700 }}
              />
              <Tooltip
                content={<CustomRegionalTooltip onNavigate={handleNavigateToRegion} />}
                cursor={{ fill: 'rgba(255, 230, 0, 0.08)' }}
                wrapperStyle={{ pointerEvents: 'auto' }}
              />
              <Bar
                dataKey="revenue"
                fill="url(#barGradient)"
                radius={[0, 6, 6, 0]}
                barSize={22}
                isAnimationActive={false}
                className="cursor-pointer"
                onClick={(entry: any) => {
                  if (entry && entry.region) {
                    handleNavigateToRegion(entry.region);
                  }
                }}
                label={{
                  position: 'right',
                  formatter: (v: any) => ` ₹${v} Cr`,
                  fontSize: 11,
                  fill: '#1E293B',
                  fontWeight: 700,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default RegionalPerformance;