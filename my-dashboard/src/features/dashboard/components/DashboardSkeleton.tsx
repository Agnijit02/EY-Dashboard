function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading dashboard">
      <div>
        <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="h-20 animate-pulse rounded-xl bg-slate-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-xl bg-slate-200" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="h-[380px] animate-pulse rounded-xl bg-slate-200 xl:col-span-2" />
        <div className="h-[380px] animate-pulse rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

export default DashboardSkeleton;