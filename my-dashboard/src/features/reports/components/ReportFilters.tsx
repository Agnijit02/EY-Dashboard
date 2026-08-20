function ReportFilters() {
	return (
		<div className="flex flex-wrap gap-3">
			<select className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-300">
				<option>Last 30 Days</option>
				<option>Last 90 Days</option>
				<option>Year to Date</option>
			</select>

			<select className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-300">
				<option>All Projects</option>
			</select>

			<select className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-300">
				<option>All Clients</option>
			</select>
		</div>
	);
}

export default ReportFilters;