interface ResourceAllocationBarProps {
	value: number;
}

function ResourceAllocationBar({ value }: ResourceAllocationBarProps) {
	const clampedValue = Math.min(Math.max(value, 0), 140);
	const barColor =
		clampedValue <= 80 ? 'bg-emerald-500' : clampedValue <= 100 ? 'bg-amber-500' : 'bg-rose-500';

	return (
		<div className="space-y-1.5">
			<div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
				<span>Allocation</span>
				<span>{value}%</span>
			</div>
			<div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
				<div
					className={`h-full rounded-full ${barColor} transition-all`}
					style={{ width: `${Math.min(clampedValue, 100)}%` }}
				/>
			</div>
		</div>
	);
}

export default ResourceAllocationBar;
