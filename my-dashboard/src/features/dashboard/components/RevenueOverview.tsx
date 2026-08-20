import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { RevenueData } from '../dashboard.types';

interface RevenueOverviewProps {
  data: RevenueData[];
}

function RevenueOverview({ data }: RevenueOverviewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)]">
      <div className="border-b border-slate-200/60 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FFE600] shadow-[0_0_6px_rgba(255,230,0,0.3)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Financial trajectory</p>
            </div>
            <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-950">Revenue Performance</h2>
            <p className="mt-1 text-[13px] text-slate-500">Revenue compared with monthly targets</p>
          </div>

          <button type="button" className="rounded-xl border border-slate-200 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm">
            Last 8 Months
          </button>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Current run rate', value: '₹128.4 Cr' },
            { label: 'Target gap', value: '+12.4%' },
            { label: 'Active accounts', value: '42' },
            { label: 'Forecast confidence', value: 'High' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:border-slate-200 hover:shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
              <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-slate-950">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFE600" stopOpacity={0.15} />
                  <stop offset="50%" stopColor="#1A1A1A" stopOpacity={0.05} />
                  <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} tickFormatter={(value) => `₹${value}Cr`} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                  fontWeight: 500,
                }}
                formatter={(value, name) => [`₹${value} Cr`, name === 'revenue' ? 'Revenue' : 'Target']}
              />
              <Area type="monotone" dataKey="target" stroke="#cbd5e1" strokeDasharray="5 5" fill="transparent" strokeWidth={1.5} isAnimationActive={false} />
              <Area type="monotone" dataKey="revenue" stroke="#1A1A1A" fill="url(#revenueGradient)" strokeWidth={2} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default RevenueOverview;