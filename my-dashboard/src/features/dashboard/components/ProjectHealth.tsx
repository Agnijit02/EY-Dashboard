import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { ProjectHealthData } from '../dashboard.types';

interface ProjectHealthProps {
  data: ProjectHealthData[];
}

const STATUS_CONFIG: Record<
  string,
  { color: string; bg: string; text: string; border: string; dot: string }
> = {
  Completed: {
    color: '#1A1A1A',
    bg: 'bg-[#1A1A1A]/10',
    text: 'text-[#1A1A1A]',
    border: '#1A1A1A',
    dot: 'bg-[#1A1A1A]',
  },
  Active: {
    color: '#0284C7',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: '#0284C7',
    dot: 'bg-sky-500',
  },
  'At Risk': {
    color: '#F59E0B',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: '#F59E0B',
    dot: 'bg-amber-500',
  },
  Delayed: {
    color: '#E11D48',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: '#E11D48',
    dot: 'bg-rose-500',
  },
};

const DEFAULT_CONFIG = {
  color: '#64748b',
  bg: 'bg-slate-50',
  text: 'text-slate-700',
  border: '#64748b',
  dot: 'bg-slate-500',
};

function ProjectHealth({ data }: ProjectHealthProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)]">
      {/* Card Header */}
      <div className="border-b border-slate-200/60 px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#FFE600] ring-2 ring-[#FFE600]/30" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Portfolio Status</p>
        </div>
        <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-950">Project Health</h2>
        <p className="mt-0.5 text-[13px] text-slate-500">Current portfolio delivery status breakdown</p>
      </div>

      {/* Donut Chart and Metrics */}
      <div className="flex flex-1 flex-col justify-between p-6">
        {/* Donut Chart Container */}
        <div className="relative mx-auto flex h-[210px] w-full max-w-[280px] items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={82}
                startAngle={90}
                endAngle={-270}
                paddingAngle={3}
                stroke="#ffffff"
                strokeWidth={3}
                isAnimationActive={false}
              >
                {data.map((item) => {
                  const config = STATUS_CONFIG[item.name] || DEFAULT_CONFIG;
                  return <Cell key={item.name} fill={config.color} />;
                })}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  `${value} projects (${total > 0 ? Math.round(((Number(value) || 0) / total) * 100) : 0}%)`,
                  'Count',
                ]}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: '#ffffff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label inside Donut */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold tracking-tight text-slate-950">{total}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Projects</span>
          </div>
        </div>

        {/* Status Legend Breakdown */}
        <div className="mt-4 space-y-2">
          {data.map((item) => {
            const config = STATUS_CONFIG[item.name] || DEFAULT_CONFIG;
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;

            return (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/50 px-3.5 py-2 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-xs"
                style={{ borderLeftWidth: '4px', borderLeftColor: config.border }}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${config.dot}`} />
                  <span className="text-xs font-semibold text-slate-800">{item.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium text-slate-400">{percentage}%</span>
                  <span className="text-xs font-bold text-slate-950">{item.value}</span>
                </div>
              </div>
            );
          })}

          {/* Total Summary Footer */}
          <div className="mt-3 flex items-center justify-between rounded-xl border border-[#FFE600]/40 bg-[#FFE600]/10 px-3.5 py-2.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700">Total Portfolio</span>
            <span className="text-sm font-extrabold tracking-tight text-slate-950">{total} Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectHealth;