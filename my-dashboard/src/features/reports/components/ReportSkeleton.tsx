function ReportSkeleton() {
	return (
		<div className="space-y-6">
			<div>
				<div className="h-7 w-52 animate-pulse rounded bg-slate-100" />
				<div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-100" />
			</div>

			<div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="h-32 animate-pulse rounded-xl bg-slate-100" />
				))}
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="h-[360px] animate-pulse rounded-xl bg-slate-100" />
				))}
			</div>
		</div>
	);
}

export default ReportSkeleton;
