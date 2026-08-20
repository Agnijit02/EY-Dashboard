import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function ProjectPagination({ page, totalPages, total, pageSize, onPageChange }: ProjectPaginationProps) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-slate-500">
        Showing <span className="font-medium text-slate-700">{start}</span> to <span className="font-medium text-slate-700">{end}</span> of <span className="font-medium text-slate-700">{total}</span> projects
      </p>

      <div className="flex items-center gap-1">
        <button type="button" disabled={page === 1} onClick={() => onPageChange(page - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={`h-8 min-w-8 rounded-lg px-2 text-xs font-medium ${pageNumber === page ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            {pageNumber}
          </button>
        ))}

        <button type="button" disabled={page === totalPages} onClick={() => onPageChange(page + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Next page">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default ProjectPagination;