interface Props {
	page: number;
	totalPages: number;
	total: number;
	pageSize: number;
	onPageChange: (page: number) => void;
}

function TablePagination({ page, totalPages, total, pageSize, onPageChange }: Props) {
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="flex items-center justify-between border border-[#E2E2E2] bg-white px-5 py-4 text-sm text-[#525252]">
			<p>
				Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
			</p>
			<div className="flex items-center gap-2">
				<button type="button" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1} className="rounded-full border border-[#D4D4D4] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-50">
					Previous
				</button>
				<button type="button" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded-full border border-[#D4D4D4] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-50">
					Next
				</button>
			</div>
		</div>
	);
}

export default TablePagination;
