import { Download } from 'lucide-react';

function ExportReportMenu() {
	return (
		<button type="button" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
			<Download className="h-4 w-4" />
			Export
		</button>
	);
}

export default ExportReportMenu;
