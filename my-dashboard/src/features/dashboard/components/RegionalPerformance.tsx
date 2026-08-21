import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, Building, CheckCircle2, Clock, Globe, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { RegionalPerformanceData } from '../dashboard.types';
import type { ProjectRegion } from '../../projects/projects.types';
import { useProjectsStore } from '../../../store/projectsStore';

interface RegionalPerformanceProps {
  data: RegionalPerformanceData[];
}

interface CustomRegionalTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: RegionalPerformanceData;
  }>;
  onNavigate?: (regionName: string) => void;
}

function CustomRegionalTooltip({ active, payload, onNavigate }: CustomRegionalTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const regionData = payload[0]?.payload;
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
              <p className="text-[11px] font-medium text-slate-400">
                {regionData.projectCount || projects.length} Active Portfolio Engagements
              </p>
            </div>
          </div>

          <span className="rounded-lg bg-emerald-950/80 px-2 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-800/60">
            +{regionData.growth}% YoY
          </span>
        </div>

        <div className="mt-3 flex items-baseline justify-between rounded-xl bg-slate-900/80 px-3 py-2 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Total Regional Revenue</span>
          <span className="text-base font-black tracking-tight text-[#FFE600]">₹{regionData.revenue} Cr</span>
        </div>
      </div>

      {/* Project Status Summary Pills */}
      <div className="my-3 grid grid-cols-4 gap-1.5 text-center text-[10px] font-semibold">
        <div className="rounded-lg bg-emerald-950/40 p-1.5 text-emerald-400 border border-emerald-900/40">
          <span className="block font-black text-xs">{completedCount}</span>
          <span className="text-[9px] text-slate-400">Done</span>
        </div>
        <div className="rounded-lg bg-blue-950/40 p-1.5 text-blue-400 border border-blue-900/40">
          <span className="block font-black text-xs">{activeCount}</span>
          <span className="text-[9px] text-slate-400">Active</span>
        </div>
        <div className="rounded-lg bg-amber-950/40 p-1.5 text-amber-400 border border-amber-900/40">
          <span className="block font-black text-xs">{atRiskCount}</span>
          <span className="text-[9px] text-slate-400">At Risk</span>
        </div>
        <div className="rounded-lg bg-rose-950/40 p-1.5 text-rose-400 border border-rose-900/40">
          <span className="block font-black text-xs">{delayedCount}</span>
          <span className="text-[9px] text-slate-400">Delayed</span>
        </div>
      </div>

      {/* Top 3 Featured Projects */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
          <span>Top Featured Projects ({topProjects.length})</span>
          <span>Budget</span>
        </div>

        <div className="space-y-1.5">
          {topProjects.map((p) => {
            const isDone = p.status === 'completed';
            const isWarn = p.status === 'at-risk' || p.status === 'delayed';

            return (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-xl bg-slate-900/70 p-2.5 transition-colors border border-slate-800/80 hover:border-slate-700"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    {isDone ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    ) : isWarn ? (
                      <ShieldAlert className="h-3 w-3 text-amber-400 shrink-0" />
                    ) : (
                      <Clock className="h-3 w-3 text-blue-400 shrink-0" />
                    )}
                    <p className="truncate text-xs font-bold text-slate-200">{p.name}</p>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Building className="h-2.5 w-2.5 text-slate-500" />
                    <span className="truncate max-w-[120px]">{p.client}</span>
                    <span>•</span>
                    <span className="capitalize text-slate-300">{p.status}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-[#FFE600]">₹{p.budget} Cr</p>
                  <p className="text-[9px] font-semibold text-slate-400">{p.progress}% done</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Breakdown of Remaining Projects */}
        {remainingCount > 0 && (
          <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/40 p-2.5 text-center mt-2">
            <p className="text-xs font-bold text-slate-300">
              + {remainingCount} more projects in {regionData.region} (₹{remainingBudget} Cr)
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Completes total regional portfolio of ₹{regionData.revenue} Cr
            </p>
          </div>
        )}

        {/* View All Redirection Action */}
        {onNavigate && (
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
    const regionLower = regionName.toLowerCase() as ProjectRegion;
    useProjectsStore.getState().setRegion(regionLower);
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
                onClick={(entry) => {
                  if (entry && typeof entry === 'object' && 'region' in entry && typeof entry.region === 'string') {
                    handleNavigateToRegion(entry.region);
                  }
                }}
                label={{
                  position: 'right',
                  formatter: (v) => (v !== undefined && v !== null ? ` ₹${String(v)} Cr` : ''),
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