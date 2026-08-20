import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import type { KPIData } from '../dashboard.types';

interface KPICardProps {
  data: KPIData;
}

function KPICard({ data }: KPICardProps) {
  const isPositive = data.changeType === 'positive';
  const isNegative = data.changeType === 'negative';

  return (
    <div className="card-lift group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)]">
      {/* Animated gradient top accent */}
      <div className="animate-shimmer absolute inset-x-0 top-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #FFE600 0%, #1A1A1A 50%, #FFE600 100%)', backgroundSize: '200% 100%' }} />

      {/* Ambient corner glow */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#FFE600]/[0.04] blur-2xl transition-all duration-500 group-hover:bg-[#FFE600]/[0.08]" />

      <div className="relative flex items-start justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{data.title}</p>

        <span
          className={
            isPositive
              ? 'inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700'
              : isNegative
                ? 'inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700'
                : 'inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600'
          }
        >
          {isPositive ? <ArrowUpRight className="h-3 w-3" /> : null}
          {isNegative ? <ArrowDownRight className="h-3 w-3" /> : null}
          {!isPositive && !isNegative ? <Minus className="h-3 w-3" /> : null}
          {data.change}
        </span>
      </div>

      <div className="relative mt-4">
        <p className="text-[28px] font-bold tracking-[-0.04em] text-slate-950">{data.value}</p>
      </div>

      <div className="relative mt-3 flex items-center gap-2">
        <span className="text-xs text-slate-400">{data.description}</span>
      </div>

      {/* Bottom progress indicator */}
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: isPositive ? '75%' : isNegative ? '35%' : '50%',
            background: isPositive
              ? 'linear-gradient(90deg, #FFE600, #1A1A1A)'
              : isNegative
                ? 'linear-gradient(90deg, #f43f5e, #fb7185)'
                : 'linear-gradient(90deg, #94a3b8, #cbd5e1)',
          }}
        />
      </div>
    </div>
  );
}

export default KPICard;