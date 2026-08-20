import { Fragment } from 'react';
import type { Risk } from '../risks.types';

interface RiskHeatmapProps {
	risks: Risk[];
	onSelectCell?: (probability: number, impact: number) => void;
}

function getCellColor(score: number, count: number) {
	const hasRisks = count > 0;

	if (score >= 15) {
		// Critical Severity (15 - 25)
		return hasRisks
			? 'bg-rose-500 text-white border-rose-600 shadow-md ring-2 ring-rose-300 font-bold scale-[1.02]'
			: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100';
	}
	if (score >= 10) {
		// High Severity (10 - 14)
		return hasRisks
			? 'bg-orange-500 text-white border-orange-600 shadow-md ring-2 ring-orange-300 font-bold scale-[1.02]'
			: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100';
	}
	if (score >= 5) {
		// Medium Severity (5 - 9)
		return hasRisks
			? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm ring-2 ring-amber-200 font-bold scale-[1.02]'
			: 'bg-amber-50/80 border-amber-200 text-amber-700 hover:bg-amber-100';
	}
	// Low Severity (1 - 4)
	return hasRisks
		? 'bg-emerald-500 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-200 font-bold scale-[1.02]'
		: 'bg-emerald-50/80 border-emerald-200 text-emerald-700 hover:bg-emerald-100';
}

function RiskHeatmap({ risks, onSelectCell }: RiskHeatmapProps) {
	const getRisksForCell = (probability: number, impact: number) =>
		risks.filter((risk) => risk.probability === probability && risk.impact === impact);

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
			<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center border-b border-slate-100 pb-4">
				<div>
					<h2 className="text-base font-bold text-slate-900">Governance Risk Heatmap (5×5 Matrix)</h2>
					<p className="text-xs text-slate-500">Probability versus impact distribution mapped to risk severity tiers.</p>
				</div>

				{/* Heatmap Legend */}
				<div className="flex flex-wrap items-center gap-3 text-xs">
					<div className="flex items-center gap-1.5">
						<span className="h-3 w-3 rounded-md bg-emerald-500" />
						<span className="font-medium text-slate-600">Low (1-4)</span>
					</div>
					<div className="flex items-center gap-1.5">
						<span className="h-3 w-3 rounded-md bg-amber-400" />
						<span className="font-medium text-slate-600">Medium (5-9)</span>
					</div>
					<div className="flex items-center gap-1.5">
						<span className="h-3 w-3 rounded-md bg-orange-500" />
						<span className="font-medium text-slate-600">High (10-14)</span>
					</div>
					<div className="flex items-center gap-1.5">
						<span className="h-3 w-3 rounded-md bg-rose-500" />
						<span className="font-medium text-slate-600">Critical (15-25)</span>
					</div>
				</div>
			</div>

			<div className="mt-6 overflow-x-auto">
				<div className="min-w-[580px]">
					<div className="grid grid-cols-[120px_repeat(5,1fr)] gap-1">
						{/* Top Impact Header */}
						<div className="flex items-end justify-center pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
							Probability ↓
						</div>
						{[1, 2, 3, 4, 5].map((impact) => (
							<div key={impact} className="pb-2 text-center text-xs font-bold text-slate-700">
								Impact {impact}
								<span className="block text-[10px] font-normal text-slate-400">
									{impact === 1 ? 'Minor' : impact === 2 ? 'Low' : impact === 3 ? 'Moderate' : impact === 4 ? 'Major' : 'Catastrophic'}
								</span>
							</div>
						))}

						{/* Probability Rows (5 down to 1) */}
						{[5, 4, 3, 2, 1].map((probability) => (
							<Fragment key={`row-${probability}`}>
								<div className="flex flex-col justify-center pr-3 text-xs font-bold text-slate-700">
									<span>Prob. {probability}</span>
									<span className="text-[10px] font-normal text-slate-400">
										{probability === 5 ? 'Almost Certain' : probability === 4 ? 'Likely' : probability === 3 ? 'Possible' : probability === 2 ? 'Unlikely' : 'Rare'}
									</span>
								</div>

								{[1, 2, 3, 4, 5].map((impact) => {
									const score = probability * impact;
									const matchingRisks = getRisksForCell(probability, impact);
									const count = matchingRisks.length;
									const colorClasses = getCellColor(score, count);

									return (
										<div
											key={`${probability}-${impact}`}
											onClick={() => onSelectCell?.(probability, impact)}
											className={`relative flex h-16 flex-col items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer ${colorClasses}`}
											title={`Probability: ${probability}, Impact: ${impact}, Risk Score: ${score}${matchingRisks.length > 0 ? ` (${matchingRisks.map((r) => r.title).join(', ')})` : ''}`}
										>
											<p className="text-base font-extrabold">{count}</p>
											<span className="text-[10px] opacity-75 font-mono">Score: {score}</span>

											{count > 0 && (
												<span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[9px] font-bold text-slate-900 shadow-xs">
													!
												</span>
											)}
										</div>
									);
								})}
							</Fragment>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default RiskHeatmap;
