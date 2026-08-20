import { PrismaClient, UserRole, ClientStatus, ProjectStatus, ResourceDepartment, ResourceStatus, RiskCategory, RiskSeverity, RiskStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with full enterprise demo dataset...');

  const defaultPasswordHash = await bcrypt.hash('Password123!', 12);

  // 1. Create Core Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ey.com' },
    update: { passwordHash: defaultPasswordHash, role: UserRole.ADMIN },
    create: {
      name: 'Aarav Sharma (Admin)',
      email: 'admin@ey.com',
      passwordHash: defaultPasswordHash,
      role: UserRole.ADMIN,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@ey.com' },
    update: { passwordHash: defaultPasswordHash, role: UserRole.MANAGER },
    create: {
      name: 'Priya Patel (Manager)',
      email: 'manager@ey.com',
      passwordHash: defaultPasswordHash,
      role: UserRole.MANAGER,
    },
  });

  await prisma.user.upsert({
    where: { email: 'viewer@ey.com' },
    update: { passwordHash: defaultPasswordHash, role: UserRole.VIEWER },
    create: {
      name: 'Vikram Mehta (Viewer)',
      email: 'viewer@ey.com',
      passwordHash: defaultPasswordHash,
      role: UserRole.VIEWER,
    },
  });

  // 2. Create Enterprise Clients
  const clientNames = [
    { name: 'Stark Industries', industry: 'Defense & Tech', tcv: 35.0, count: 1 },
    { name: 'ABC Corporation', industry: 'Financial Services', tcv: 42.5, count: 8 },
    { name: 'XYZ Limited', industry: 'Retail & E-commerce', tcv: 28.0, count: 6 },
    { name: 'Acme Industries', industry: 'Manufacturing', tcv: 31.5, count: 5 },
    { name: 'Global Enterprises', industry: 'Healthcare', tcv: 24.0, count: 4 },
    { name: 'TechNova', industry: 'Telecom', tcv: 19.5, count: 3 },
  ];

  const createdClients = [];
  for (const c of clientNames) {
    const created = await prisma.client.create({
      data: {
        name: c.name,
        industry: c.industry,
        status: ClientStatus.ACTIVE,
        totalContractValue: c.tcv,
        projectCount: c.count,
      },
    });
    createdClients.push(created);
  }

  // 3. Create Projects
  const projectSeeds = [
    { name: 'Project Phoenix - Cloud Modernization', code: 'PRJ-0001', budget: 35.0, spent: 18.5, progress: 72, status: ProjectStatus.ACTIVE, clientIdx: 0 },
    { name: 'Project Atlas - ERP Core Migration', code: 'PRJ-0002', budget: 14.5, spent: 12.0, progress: 85, status: ProjectStatus.ACTIVE, clientIdx: 1 },
    { name: 'Project Horizon - Data Lakehouse', code: 'PRJ-0003', budget: 8.5, spent: 4.2, progress: 54, status: ProjectStatus.ACTIVE, clientIdx: 2 },
    { name: 'Project Orion - Cyber Defense Platform', code: 'PRJ-0004', budget: 12.0, spent: 7.8, progress: 65, status: ProjectStatus.ACTIVE, clientIdx: 3 },
    { name: 'Project Mercury - Omnichannel Portal', code: 'PRJ-0005', budget: 6.2, spent: 6.2, progress: 100, status: ProjectStatus.COMPLETED, clientIdx: 4 },
    { name: 'Project Apollo - Supply Chain AI', code: 'PRJ-0006', budget: 9.8, spent: 5.5, progress: 38, status: ProjectStatus.ON_HOLD, clientIdx: 5 },
  ];

  const createdProjects = [];
  for (const p of projectSeeds) {
    const created = await prisma.project.create({
      data: {
        name: p.name,
        code: p.code,
        description: `Strategic enterprise delivery program for ${createdClients[p.clientIdx].name}.`,
        status: p.status,
        progress: p.progress,
        budget: p.budget * 10000000,
        spent: p.spent * 10000000,
        startDate: new Date('2026-01-15'),
        endDate: new Date('2026-11-30'),
        clientId: createdClients[p.clientIdx].id,
        ownerId: admin.id,
      },
    });
    createdProjects.push(created);
  }

  // 4. Create Resources
  await prisma.resource.createMany({
    data: [
      {
        name: 'Dr. Jane Foster',
        email: 'jane.foster@ey.com',
        department: ResourceDepartment.ENGINEERING,
        designation: 'Senior Architect',
        allocation: 80,
        availability: 20,
        status: ResourceStatus.ACTIVE,
      },
      {
        name: 'Aarav Nair',
        email: 'aarav.nair@ey.com',
        department: ResourceDepartment.ENGINEERING,
        designation: 'Senior Architect',
        allocation: 82,
        availability: 18,
        status: ResourceStatus.ACTIVE,
      },
      {
        name: 'Meera Joshi',
        email: 'meera.joshi@ey.com',
        department: ResourceDepartment.CONSULTING,
        designation: 'Project Manager',
        allocation: 68,
        availability: 32,
        status: ResourceStatus.ACTIVE,
      },
      {
        name: 'Rohan Iyer',
        email: 'rohan.iyer@ey.com',
        department: ResourceDepartment.ENGINEERING,
        designation: 'Full Stack Engineer',
        allocation: 96,
        availability: 4,
        status: ResourceStatus.ACTIVE,
      },
      {
        name: 'Nisha Patel',
        email: 'nisha.patel@ey.com',
        department: ResourceDepartment.ANALYTICS,
        designation: 'Data Scientist',
        allocation: 100,
        availability: 0,
        status: ResourceStatus.ACTIVE,
      },
    ],
  });

  // 5. Create Risks
  await prisma.risk.createMany({
    data: [
      {
        riskId: 'RISK-0001',
        title: 'Data migration delay',
        description: 'Legacy data migration may take longer due to source schema inconsistencies.',
        category: RiskCategory.TECHNICAL,
        probability: 4,
        impact: 5,
        score: 20,
        severity: RiskSeverity.CRITICAL,
        status: RiskStatus.OPEN,
        mitigationPlan: 'Introduce parallel migration pipelines and dual-run validation.',
        dueDate: new Date('2026-09-30'),
        projectId: createdProjects[0].id,
        ownerId: admin.id,
      },
      {
        riskId: 'RISK-0002',
        title: 'Security vulnerability',
        description: 'Critical dependency patch required on payment gateway webhook.',
        category: RiskCategory.SECURITY,
        probability: 5,
        impact: 5,
        score: 25,
        severity: RiskSeverity.CRITICAL,
        status: RiskStatus.OPEN,
        mitigationPlan: 'Upgrade to hardened microservice and complete penetration test.',
        dueDate: new Date('2026-08-25'),
        projectId: createdProjects[3].id,
        ownerId: manager.id,
      },
      {
        riskId: 'RISK-0003',
        title: 'Resource availability contention',
        description: 'Senior cloud architects over-allocated across simultaneous sprints.',
        category: RiskCategory.RESOURCE,
        probability: 3,
        impact: 4,
        score: 12,
        severity: RiskSeverity.HIGH,
        status: RiskStatus.MONITORING,
        mitigationPlan: 'Rebalance allocations and onboard bench engineers.',
        dueDate: new Date('2026-09-15'),
        projectId: createdProjects[1].id,
        ownerId: manager.id,
      },
    ],
  });

  console.log('Database seeded with full enterprise dataset, clients, projects, resources, and risks!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
