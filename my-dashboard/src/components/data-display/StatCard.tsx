import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface Props {
	label: string;
	value: string | number;
	change?: number;
	description?: string;
	accent?: boolean;
}

function StatCard({ label, value, change, description, accent = false }: Props) {
	const positive = (change ?? 0) >= 0;

	return (
		<div className={['relative overflow-hidden rounded-[28px] border border-[#E2E2E2] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]', accent ? 'ring-1 ring-[#FFE600]/40' : ''].join(' ')}>
			<div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#FFE600_0%,#1A1A1A_100%)]" />
			<p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#737373]">{label}</p>
			<div className="mt-3 flex items-end justify-between gap-3">
				<p className="text-3xl font-semibold tracking-[-0.04em] text-[#1A1A1A]">{value}</p>
				{change !== undefined ? (
					<span className="inline-flex items-center gap-1 rounded-full border border-[#E2E2E2] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#525252]">
						{positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
						{Math.abs(change)}%
					</span>
				) : null}
			</div>
			{description ? <p className="mt-2 text-xs text-[#737373]">{description}</p> : null}
		</div>
	);
}

export default StatCard;
