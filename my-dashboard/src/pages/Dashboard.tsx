import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Button from '../components/ui/Button';
import PageHeader from '../components/layout/PageHeader';
import DashboardFilters from '../features/dashboard/components/DashboardFilters';
import DashboardError from '../features/dashboard/components/DashboardError';
import DashboardSkeleton from '../features/dashboard/components/DashboardSkeleton';
import KPIGrid from '../features/dashboard/components/KPIGrid';
import ProjectHealth from '../features/dashboard/components/ProjectHealth';
import RecentActivity from '../features/dashboard/components/RecentActivity';
import RegionalPerformance from '../features/dashboard/components/RegionalPerformance';
import RevenueOverview from '../features/dashboard/components/RevenueOverview';
import RiskOverview from '../features/dashboard/components/RiskOverview';
import CreateProjectModal from '../features/projects/components/CreateProjectModal';
import type { ProjectFormValues } from '../features/projects/projects.schema';
import { useDashboardQuery } from '../hooks/useDashboardQuery';
import { useAuth } from '../hooks/useAuth';
import { useProjectMutations } from '../hooks/useProjectMutations';
import { useFilterStore } from '../store/filterStore';

function Dashboard() {
  const { canManage } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { createMutation } = useProjectMutations();

  const dateRange = useFilterStore((state) => state.dateRange);
  const region = useFilterStore((state) => state.region);
  const department = useFilterStore((state) => state.department);
  const projectStatus = useFilterStore((state) => state.projectStatus);

  const filters = useMemo(
    () => ({
      dateRange,
      region,
      department,
      projectStatus,
    }),
    [dateRange, region, department, projectStatus],
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useDashboardQuery(filters);

  const handleCreateProject = (values: ProjectFormValues) => {
    createMutation.mutate(values, {
      onSuccess: (newProject) => {
        setIsCreateModalOpen(false);
        toast.success(`Project "${newProject.name}" created successfully`);
        void refetch();
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : 'Failed to create project');
      },
    });
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return <DashboardError message={error instanceof Error ? error.message : 'Unable to load dashboard data.'} onRetry={() => refetch()} />;
  }

  const heroKpis = data.kpis.slice(0, 3);
  const revenuePoints = data.revenue.slice(-8);
  const maxRevenue = Math.max(...revenuePoints.map((point) => point.revenue));
  const criticalRisks = data.risks.find((item) => item.level === 'Critical')?.count ?? 0;
  const totalProjects = data.projectHealth.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Executive Intelligence"
        title="Dashboard"
        description="Monitor enterprise performance across your portfolio, delivery health, and risk profile."
        actions={
          canManage ? (
            <Button
              variant="accent"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Add Project
            </Button>
          ) : undefined
        }
      />

      {/* ─── Hero Section ─── */}
      <section className="grid gap-5 xl:grid-cols-[1.55fr_0.95fr]">
        {/* Command Center Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.2)]" style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #252525 100%)' }}>
          {/* Ambient gradient mesh */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-10 top-10 h-48 w-48 rounded-full bg-[#FFE600]/[0.05] blur-[80px]" />
            <div className="absolute -left-10 bottom-10 h-32 w-32 rounded-full bg-[#FFE600]/[0.03] blur-[60px]" />
          </div>

          <div className="relative flex h-full flex-col justify-between gap-8 p-6 lg:p-8">
            {/* Status badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                <span className="animate-dot-pulse h-1.5 w-1.5 rounded-full bg-[#FFE600] shadow-[0_0_6px_rgba(255,230,0,0.5)]" />
                {isFetching ? 'Syncing live metrics' : 'All systems operational'}
              </div>
            </div>

            {/* Hero text */}
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                Enterprise Command Center
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-white/50">
                Track portfolio health, revenue movement, project delivery, and risk exposure from a single executive view.
              </p>
            </div>

            {/* Hero KPI mini-cards */}
            <div className="grid gap-3 sm:grid-cols-3">
              {heroKpis.map((kpi) => (
                <div key={kpi.id} className="group/kpi rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#FFE600]/20 hover:bg-white/[0.06]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">{kpi.title}</p>
                  <p className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white">{kpi.value}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-[#FFE600]/70">{kpi.change}</span>
                    <span className="text-[11px] text-white/30">vs prior</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Overview Card */}
        <Card className="overflow-hidden">
          <div className="border-b border-slate-200/60 px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Statistics Overview</p>
                <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900">Portfolio Pulse</h2>
              </div>
              <Badge variant="neutral">FY 2025</Badge>
            </div>
          </div>

          <div className="px-6 py-5">
            {/* Chart bars */}
            <div className="flex h-44 items-end gap-2 rounded-xl bg-slate-50/80 px-4 py-4">
              {revenuePoints.map((point) => {
                const height = Math.max(12, (point.revenue / maxRevenue) * 100);
                return (
                  <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-28 w-full items-end justify-center">
                      <div
                        className="w-full max-w-[22px] rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{
                          height: `${height}%`,
                          background: 'linear-gradient(180deg, #FFE600 0%, #1A1A1A 100%)',
                          boxShadow: '0 0 8px rgba(255, 230, 0, 0.1)',
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">{point.month}</span>
                  </div>
                );
              })}
            </div>

            {/* Summary stats */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200/60 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Projects</p>
                <p className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-900">{totalProjects}</p>
              </div>
              <div className="rounded-xl border border-slate-200/60 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Critical</p>
                <p className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-900">{criticalRisks}</p>
              </div>
              <div className="rounded-xl border border-[#FFE600]/20 bg-[#FFE600]/[0.04] p-4 transition-all duration-200 hover:border-[#FFE600]/30">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Status</p>
                <p className="mt-2 text-sm font-bold text-slate-900">Executive ready</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <DashboardFilters />

      <KPIGrid data={data.kpis} />

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 min-w-0">
          <RevenueOverview data={data.revenue} />
        </div>

        <div className="min-w-0">
          <ProjectHealth data={data.projectHealth} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="min-w-0">
          <RegionalPerformance data={data.regionalPerformance} />
        </div>
        <div className="min-w-0">
          <RiskOverview data={data.risks} />
        </div>
      </section>

      <section className="min-w-0">
        <RecentActivity data={data.activities} />
      </section>

      {/* Create Project Modal */}
      <CreateProjectModal
        open={isCreateModalOpen}
        isSubmitting={createMutation.isPending}
        onClose={() => {
          if (!createMutation.isPending) {
            setIsCreateModalOpen(false);
          }
        }}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}

export default Dashboard;