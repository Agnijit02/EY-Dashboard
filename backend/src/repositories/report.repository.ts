import { prisma } from '../config/database';

export async function getOverviewMetrics() {
  const [
    totalProjects,
    activeProjects,
    totalClients,
    totalResources,
    criticalRisks,
    projects,
    risks,
    clients,
    resources,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: 'ACTIVE' } }),
    prisma.client.count(),
    prisma.resource.count(),
    prisma.risk.count({ where: { severity: 'CRITICAL' } }),
    prisma.project.findMany({ select: { budget: true, spent: true, progress: true, status: true } }),
    prisma.risk.findMany({ select: { severity: true, status: true } }),
    prisma.client.findMany({ select: { totalContractValue: true, status: true } }),
    prisma.resource.findMany({ select: { allocation: true, department: true } }),
  ]);

  const totalBudget = projects.reduce((acc, p) => acc + (p.budget || 0), 0);
  const totalSpent = projects.reduce((acc, p) => acc + (p.spent || 0), 0);
  const avgProgress =
    projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + (p.progress || 0), 0) / projects.length) : 0;
  const avgUtilization =
    resources.length > 0 ? Math.round(resources.reduce((acc, r) => acc + (r.allocation || 0), 0) / resources.length) : 0;

  return {
    kpis: {
      totalProjects,
      activeProjects,
      totalClients,
      totalResources,
      criticalRisks,
      totalBudget,
      totalSpent,
      avgProgress,
      avgUtilization,
    },
    projects,
    risks,
    clients,
    resources,
  };
}
