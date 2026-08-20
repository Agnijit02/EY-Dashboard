import type { RiskSeverity } from '../risks.types';

interface RiskSeverityBadgeProps {
	severity: RiskSeverity;
}

const severityStyles: Record<RiskSeverity, { label: string; className: string; dotClass: string }> = {
	low: {
		label: 'Low',
		className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
		dotClass: 'bg-emerald-500',
	},
	medium: {
		label: 'Medium',
		className: 'border-amber-200 bg-amber-50 text-amber-700',
		dotClass: 'bg-amber-500',
	},
	high: {
		label: 'High',
		className: 'border-orange-200 bg-orange-50 text-orange-700',
		dotClass: 'bg-orange-500',
	},
	critical: {
		label: 'Critical',
		className: 'border-rose-200 bg-rose-50 text-rose-700',
		dotClass: 'bg-rose-500',
	},
};

function RiskSeverityBadge({ severity }: RiskSeverityBadgeProps) {
	const config = severityStyles[severity];

	return (
		<span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}>
			<span className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
			{config.label}
		</span>
	);
}

export default RiskSeverityBadge;
