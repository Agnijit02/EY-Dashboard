import { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, ChevronRight, CircleAlert, FolderGit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { RiskData } from '../dashboard.types';

interface RiskOverviewProps {
  data: RiskData[];
}

const riskConfig = {
  Critical: {
    icon: CircleAlert,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    borderColor: '#ef4444',
    badgeBg: 'bg-red-100/70 text-red-800 border-red-200',
    glow: true,
  },
  High: {
    icon: AlertTriangle,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    borderColor: '#f97316',
    badgeBg: 'bg-orange-100/70 text-orange-800 border-orange-200',
    glow: false,
  },
  Medium: {
    icon: AlertCircle,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: '#f59e0b',
    badgeBg: 'bg-amber-100/70 text-amber-800 border-amber-200',
    glow: false,
  },
  Low: {
    icon: CheckCircle2,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderColor: '#10b981',
    badgeBg: 'bg-emerald-100/70 text-emerald-800 border-emerald-200',
    glow: false,
  },
} as const;

function RiskOverview({ data }: RiskOverviewProps) {
  const navigate = useNavigate();
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="border-b border-slate-200/60 px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.3)]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Governance signal</p>
        </div>
        <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-950">Risk Overview</h2>
        <p className="mt-0.5 text-[13px] text-slate-500">Portfolio risk distribution • Hover to inspect affected projects</p>
      </div>

      {/* Risk Segments List */}
      <div className="flex-1 space-y-2.5 px-6 py-5">
        {data.map((risk) => {
          const config = riskConfig[risk.level];
          const Icon = config.icon;
          const isHovered = hoveredLevel === risk.level;
          const projects = risk.projects || [];

          return (
            <div
              key={risk.level}
              onMouseEnter={() => setHoveredLevel(risk.level)}
              onMouseLeave={() => setHoveredLevel(null)}
              className={`relative rounded-xl border transition-all duration-200 ${
                isHovered
                  ? 'border-slate-300 bg-slate-50/80 shadow-md ring-1 ring-slate-900/5'
                  : 'border-slate-200/60 bg-slate-50/40 hover:border-slate-300 hover:bg-slate-50'
              }`}
              style={{ borderLeftWidth: '4px', borderLeftColor: config.borderColor }}
            >
              <div className="flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${config.iconBg} ${config.iconColor} ${
                      config.glow ? 'shadow-[0_0_10px_rgba(239,68,68,0.15)]' : ''
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-950">{risk.level}</p>
                      {projects.length > 0 && (
                        <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Risk Severity</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold tracking-tight text-slate-950">{risk.count}</p>
                </div>
              </div>

              {/* Floating Dropdown showing project names bearing this risk without pushing page layout */}
              {isHovered && projects.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-30 mt-1 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    <FolderGit2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>Projects bearing this risk:</span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                    {projects.map((proj) => (
                      <div
                        key={proj.projectName}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold shadow-2xs ${config.badgeBg}`}
                      >
                        <span className="font-bold text-slate-900">{proj.projectName}</span>
                        {proj.code && <span className="text-[10px] opacity-70">({proj.code})</span>}
                        {proj.riskTitle && (
                          <span className="text-[10px] font-normal text-slate-600 italic">
                            • {proj.riskTitle.length > 25 ? `${proj.riskTitle.slice(0, 25)}...` : proj.riskTitle}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200/60 px-6 py-4">
        <button
          type="button"
          onClick={() => navigate('/risks')}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-xs"
        >
          <span>View All Risks in Governance Matrix</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>
    </div>
  );
}

export default RiskOverview;