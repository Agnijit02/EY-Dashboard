import type { RiskSeverity } from '../risks.types';

interface RiskScoreBadgeProps {
	score: number;
	severity: RiskSeverity;
}

function RiskScoreBadge({ score, severity }: RiskScoreBadgeProps) {
	const tone = {
		low: 'text-emerald-600',
		medium: 'text-amber-600',
		high: 'text-orange-600',
		critical: 'text-rose-600',
	}[severity];

	return (
		<div className="flex items-center gap-2">
			<span className={`text-sm font-semibold text-slate-900 ${tone}`}>{score}</span>
			<span className="text-[11px] capitalize text-slate-400">{severity}</span>
		</div>
	);
}

export default RiskScoreBadge;
