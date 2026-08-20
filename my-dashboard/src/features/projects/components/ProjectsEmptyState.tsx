import { FolderSearch } from 'lucide-react';

interface ProjectsEmptyStateProps {
  onReset: () => void;
}

function ProjectsEmptyState({ onReset }: ProjectsEmptyStateProps) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <FolderSearch className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900">No projects found</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">Try changing your search or filter criteria.</p>

      <button type="button" onClick={onReset} className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
        Clear filters
      </button>
    </div>
  );
}

export default ProjectsEmptyState;