import { useEffect, useState } from 'react';
import { AlertTriangle, ArrowUpRight, BarChart3, BriefcaseBusiness, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ActivityData } from '../dashboard.types';
import { formatRelativeTime } from '../activity.service';

interface RecentActivityProps {
  data: ActivityData[];
}

const activityConfig = {
  project: { icon: BriefcaseBusiness, iconBg: 'bg-slate-100', iconColor: 'text-slate-700', route: '/projects' },
  client: { icon: Building2, iconBg: 'bg-sky-50', iconColor: 'text-sky-600', route: '/clients' },
  risk: { icon: AlertTriangle, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', route: '/risks' },
  report: { icon: BarChart3, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', route: '/reports' },
} as const;

function RecentActivity({ data }: RecentActivityProps) {
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  // Live timer recalculating relative timestamps every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between border-b border-slate-200/60 px-6 py-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.3)]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Live feed</p>
          </div>
          <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-950">Recent Activity</h2>
          <p className="mt-1 text-[13px] text-slate-500">Live operational events tracked across portfolio</p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-xs cursor-pointer"
        >
          <span>View all</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>

      <div className="divide-y divide-slate-100/80 px-6">
        {data.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;
          const displayTime = activity.createdAt ? formatRelativeTime(activity.createdAt) : activity.timestamp;
          const exactTime = activity.createdAt ? new Date(activity.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : displayTime;

          return (
            <div
              key={activity.id}
              onClick={() => navigate(config.route)}
              className="group flex gap-4 py-4 first:pt-4 last:pb-4 cursor-pointer transition-colors hover:bg-slate-50/50 rounded-xl px-2 -mx-2"
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.iconBg} ${config.iconColor} shadow-xs transition-all duration-200 group-hover:scale-105`}>
                <Icon className="h-[18px] w-[18px]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-slate-950">{activity.title}</p>
                  <span
                    title={`Exact time: ${exactTime}`}
                    className="shrink-0 rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-200/60"
                  >
                    {displayTime}
                  </span>
                </div>

                <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivity;