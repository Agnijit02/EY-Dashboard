function PageLoader() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#1A1A1A]" />
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Loading module...</p>
    </div>
  );
}

export default PageLoader;
