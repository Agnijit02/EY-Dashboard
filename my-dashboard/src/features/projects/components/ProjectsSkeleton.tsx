function ProjectsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="h-20 animate-pulse rounded-xl bg-slate-200" />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="h-12 animate-pulse bg-slate-100" />
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-16 animate-pulse border-t border-slate-100 bg-white" />
        ))}
      </div>
    </div>
  );
}

export default ProjectsSkeleton;