interface ProjectProgressProps {
  value: number;
}

function ProjectProgress({ value }: ProjectProgressProps) {
  return (
    <div className="min-w-[120px]">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-slate-500">Progress</span>
        <span className="text-xs font-semibold text-slate-700">{value}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-slate-800 transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default ProjectProgress;