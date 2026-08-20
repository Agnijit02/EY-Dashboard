import * as reportRepository from '../repositories/report.repository';

export async function getOverview() {
  const metrics = await reportRepository.getOverviewMetrics();

  return {
    kpis: [
      {
        label: 'Total Revenue',
        value: `₹${(metrics.kpis.totalBudget / 10000000).toFixed(1)} Cr`,
        change: 12.5,
        trend: 'up',
      },
      {
        label: 'Active Projects',
        value: String(metrics.kpis.activeProjects),
        change: 8.2,
        trend: 'up',
      },
      {
        label: 'Resource Utilization',
        value: `${metrics.kpis.avgUtilization}%`,
        change: 4.1,
        trend: 'up',
      },
      {
        label: 'Critical Risks',
        value: String(metrics.kpis.criticalRisks),
        change: -15.0,
        trend: 'down',
      },
    ],
    projectPerformance: metrics.projects.slice(0, 10).map((p, idx) => ({
      projectId: `PRJ-${idx + 1}`,
      projectName: `Project ${idx + 1}`,
      completion: p.progress,
      budgetUtilization: p.budget > 0 ? Math.round((p.spent / p.budget) * 100) : 0,
      health: p.status === 'ACTIVE' ? 'healthy' : 'at-risk',
    })),
    rawMetrics: metrics.kpis,
  };
}
