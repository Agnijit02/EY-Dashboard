interface RiskSummaryCardsProps {
	total: number;
	critical: number;
	high: number;
	overdue: number;
}

function RiskSummaryCards({ total, critical, high, overdue }: RiskSummaryCardsProps) {
	const cards = [
		{ label: 'Open Risks', value: total },
		{ label: 'Critical', value: critical },
		{ label: 'High', value: high },
		{ label: 'Overdue', value: overdue },
	];

	return (
		<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
			{cards.map((card) => (
				<div key={card.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
					<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{card.label}</p>
					<p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
				</div>
			))}
		</div>
	);
}

export default RiskSummaryCards;
