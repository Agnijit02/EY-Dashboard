interface ReportHeaderProps {
	title?: string;
	subtitle?: string;
	rightContent?: React.ReactNode;
}

function ReportHeader({ title = 'Reports & Analytics', subtitle = 'Enterprise performance overview', rightContent }: ReportHeaderProps) {
	return (
		<div className="flex flex-col justify-between gap-4 rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:flex-row sm:items-end">
			<div>
				<p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Executive Intelligence</p>
				<h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h1>
				<p className="mt-1 max-w-2xl text-sm text-slate-500">{subtitle}</p>
			</div>
			{rightContent}
		</div>
	);
}

export default ReportHeader;
