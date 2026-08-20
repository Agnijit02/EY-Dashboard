import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import {
	AlertTriangle,
	Building,
	Calendar,
	CheckCircle2,
	ChevronDown,
	DollarSign,
	FileSpreadsheet,
	FileText,
	Percent,
	Printer,
	ShieldAlert,
	Sparkles,
	TrendingUp,
	UserCheck,
	Users,
} from 'lucide-react';
import { getProjectFinancialMetrics } from '../../analytics/analytics.service';
import { resourcesMockData } from '../../resources/resources.mock';
import { risksMockData } from '../../risks/risks.mock';

const COLORS = ['#FFE600', '#10B981', '#38BDF8', '#818CF8', '#F59E0B', '#EC4899'];

function createExportFileName(prefix: string, code: string, extension: string): string {
	const timestamp = Date.now();
	return `${prefix}_${code}_${timestamp}.${extension}`;
}

function ProjectDossierExporter() {
	const [searchParams, setSearchParams] = useSearchParams();
	const allProjects = useMemo(() => getProjectFinancialMetrics(), []);

	const urlProjectId = searchParams.get('projectId');
	const [selectedProjectId, setSelectedProjectId] = useState<string>('');

	const activeProjectId = (urlProjectId && allProjects.some((p) => p.projectId === urlProjectId))
		? urlProjectId
		: selectedProjectId || allProjects[0]?.projectId || '';

	const handleProjectChange = (id: string) => {
		setSelectedProjectId(id);
		setSearchParams({ projectId: id });
	};

	const project = allProjects.find((p) => p.projectId === activeProjectId) || allProjects[0];

	if (!project) {
		return null;
	}

	// 1. Associated Staffed Resources
	const assignedResources = resourcesMockData.filter((r) =>
		r.assignedProjects.some((p) =>
			p.toLowerCase().includes(project.projectName.toLowerCase()) ||
			project.projectName.toLowerCase().includes(p.toLowerCase()),
		),
	);
	const displayResources = assignedResources.length > 0
		? assignedResources
		: resourcesMockData.slice(0, 4);

	// 2. Associated Risks
	const projectRisks = risksMockData.filter(
		(r) =>
			r.projectId === project.projectId ||
			r.projectName.toLowerCase().includes(project.projectName.toLowerCase()) ||
			project.projectName.toLowerCase().includes(r.projectName.toLowerCase()),
	);

	// 3. Milestone Schedule
	const totalBudget = project.budget;
	const m1Amount = Number((totalBudget * 0.25).toFixed(2));
	const m2Amount = Number((totalBudget * 0.35).toFixed(2));
	const m3Amount = Number((totalBudget * 0.25).toFixed(2));
	const m4Amount = Number((totalBudget * 0.15).toFixed(2));

	const milestones = [
		{
			id: 'M-1',
			name: 'Phase 1: Architecture & Technical Discovery',
			amount: m1Amount,
			progress: Math.min(100, project.progress * 1.5),
			status: project.progress >= 25 ? 'Completed & Paid' : 'In Progress',
			dueDate: '2026-03-30',
			invoiceStatus: project.progress >= 25 ? 'Paid' : 'Pending',
		},
		{
			id: 'M-2',
			name: 'Phase 2: Core Platform Development & API Integration',
			amount: m2Amount,
			progress: Math.min(100, Math.max(0, (project.progress - 25) * 1.6)),
			status: project.progress >= 60 ? 'Completed & Paid' : project.progress >= 30 ? 'In Progress' : 'Pending',
			dueDate: '2026-06-30',
			invoiceStatus: project.progress >= 60 ? 'Paid' : project.progress >= 30 ? 'Invoiced' : 'Unbilled',
		},
		{
			id: 'M-3',
			name: 'Phase 3: Security Validation, Pentest & UAT',
			amount: m3Amount,
			progress: Math.min(100, Math.max(0, (project.progress - 60) * 2.5)),
			status: project.progress >= 85 ? 'Completed & Paid' : project.progress >= 60 ? 'In Progress' : 'Scheduled',
			dueDate: '2026-09-30',
			invoiceStatus: project.progress >= 85 ? 'Paid' : 'Scheduled',
		},
		{
			id: 'M-4',
			name: 'Phase 4: Production Cutover, Training & Sign-Off',
			amount: m4Amount,
			progress: project.progress === 100 ? 100 : Math.min(100, Math.max(0, (project.progress - 85) * 6.6)),
			status: project.progress === 100 ? 'Completed & Paid' : 'Upcoming',
			dueDate: project.nextMilestoneDueDate || '2026-12-15',
			invoiceStatus: project.progress === 100 ? 'Paid' : 'Scheduled',
		},
	];

	// Infographic Chart Data Specific to This Project
	const financialWaterfallData = [
		{ stage: 'Approved Budget', value: project.budget, fill: '#1E293B' },
		{ stage: 'Cost Incurred', value: project.spent, fill: '#64748B' },
		{ stage: 'Revenue Recognized', value: project.revenueGenerated, fill: '#FFE600' },
		{ stage: 'Gross Profit', value: project.grossProfit, fill: '#10B981' },
		{ stage: 'Cash Collected', value: project.collectedAmount, fill: '#38BDF8' },
		{ stage: 'Pending AR', value: project.pendingReceivable, fill: '#F59E0B' },
	];

	const resourceAllocationData = displayResources.map((r) => ({
		name: r.name.split(' ')[0],
		fullName: r.name,
		role: r.role,
		allocation: r.allocationPercentage,
		rate: r.billableRate,
	}));

	// Handlers
	const handleDownloadSingleProjectCSV = () => {
		const headers = [
			'Project Name',
			'Project Code',
			'Client Name',
			'Practice Department',
			'Engagement Manager',
			'Total Budget (Cr)',
			'Spent (Cr)',
			'Revenue Generated (Cr)',
			'Gross Profit (Cr)',
			'Profit Margin (%)',
			'Delivery Progress (%)',
			'Risk Severity',
			'Risk Description',
			'Billing Model',
			'Payment Status',
			'Payment Terms',
			'Invoiced Amount (Cr)',
			'Collected Amount (Cr)',
			'Pending Receivables (Cr)',
			'Next Milestone Due Date',
			'Staffed Resources',
		];

		const staffNames = displayResources.map((r) => `${r.name} (${r.role})`).join('; ');

		const row = [
			`"${project.projectName}"`,
			`"${project.code}"`,
			`"${project.client}"`,
			`"${project.department}"`,
			`"${project.manager}"`,
			project.budget,
			project.spent,
			project.revenueGenerated,
			project.grossProfit,
			`${project.profitMargin}%`,
			`${project.progress}%`,
			`"${project.riskSeverity}"`,
			`"${project.riskTitle}"`,
			`"${project.billingModel}"`,
			`"${project.paymentStatus}"`,
			`"${project.paymentTerms}"`,
			project.invoicedAmount,
			project.collectedAmount,
			project.pendingReceivable,
			`"${project.nextMilestoneDueDate}"`,
			`"${staffNames}"`,
		];

		const csvContent = [headers.join(','), row.join(',')].join('\n');
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('download', createExportFileName('EY_Project_Executive_Report', project.code, 'csv'));
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleDownloadJSON = () => {
		const completeDossier = {
			projectDetails: project,
			financialWaterfall: financialWaterfallData,
			milestones,
			staffedResources: displayResources,
			riskRegister: projectRisks.length > 0 ? projectRisks : [{
				title: project.riskTitle,
				severity: project.riskSeverity,
				score: project.riskScore,
			}],
			generatedAt: new Date().toISOString(),
		};

		const jsonString = JSON.stringify(completeDossier, null, 2);
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('download', createExportFileName('EY_Project_Complete_Dossier', project.code, 'json'));
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handlePrint = () => {
		window.print();
	};

	return (
		<div className="space-y-6">
			{/* Interactive Project Selector Ribbon (Hidden on Print) */}
			<div className="rounded-3xl border-2 border-slate-900 bg-[#1A1A1A] p-6 text-white shadow-xl print:hidden">
				<div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center">
					<div>
						<div className="flex items-center gap-2">
							<span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE600] px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider text-slate-950">
								<Sparkles className="h-3.5 w-3.5 text-slate-950" />
								Project Infographic Intelligence
							</span>
							<span className="text-xs font-semibold text-slate-400">Single-Engagement Deep-Dive Report</span>
						</div>
						<h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
							Dedicated Project Executive Report
						</h2>
						<p className="text-xs text-slate-400">
							Select any engagement to inspect all charts, financial waterfalls, resource allocations, and risk action plans.
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						<button
							type="button"
							onClick={handleDownloadSingleProjectCSV}
							className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-[#FFE600] hover:bg-slate-700 hover:border-[#FFE600] transition-colors"
						>
							<FileSpreadsheet className="h-4 w-4 text-[#FFE600]" />
							Download Project CSV
						</button>

						<button
							type="button"
							onClick={handleDownloadJSON}
							className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
						>
							<FileText className="h-4 w-4" />
							JSON
						</button>

						<button
							type="button"
							onClick={handlePrint}
							className="flex items-center gap-2 rounded-xl bg-[#FFE600] px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-md hover:bg-yellow-400 transition-colors"
						>
							<Printer className="h-4 w-4" />
							Print / Save PDF Report
						</button>
					</div>
				</div>

				{/* Project Dropdown Bar */}
				<div className="mt-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-4">
					<label htmlFor="dossier-proj-select" className="block text-[11px] font-bold uppercase tracking-wider text-[#FFE600]">
						Select Project Engagement
					</label>
					<div className="relative mt-1.5">
						<select
							id="dossier-proj-select"
							value={selectedProjectId}
							onChange={(e) => handleProjectChange(e.target.value)}
							className="h-12 w-full appearance-none rounded-xl border border-slate-700 bg-slate-800 px-4 pr-10 text-sm font-semibold text-white outline-none focus:border-[#FFE600]"
						>
							{allProjects.map((p) => (
								<option key={p.projectId} value={p.projectId}>
									{p.projectName} ({p.code}) — Client: {p.client} • Budget: ₹{p.budget} Cr • Margin: {p.profitMargin}% • Risk: {p.riskSeverity.toUpperCase()}
								</option>
							))}
						</select>
						<ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
					</div>
				</div>
			</div>

			{/* ========================================================================= */}
			{/* DEDICATED INFOGRAPHIC REPORT DOSSIER FOR THIS SPECIFIC PROJECT */}
			{/* ========================================================================= */}
			<div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs print:p-0 print:border-none print:shadow-none space-y-8">
				{/* 1. Project Title & Executive Overview */}
				<div className="border-b border-slate-200 pb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
					<div>
						<div className="flex items-center gap-2">
							<span className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-mono font-bold text-[#FFE600]">
								{project.code}
							</span>
							<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
								{project.department} Practice
							</span>
							<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
								{project.progress}% Delivery Completed
							</span>
						</div>

						<h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
							{project.projectName}
						</h1>

						<p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
							Executive delivery engagement managing technical architecture, cloud migration, and capability optimization for <strong className="text-slate-900">{project.client}</strong>.
						</p>

						<div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
							<div className="flex items-center gap-1.5">
								<Building className="h-4 w-4 text-slate-400" />
								<span>Client Account: <strong className="text-slate-800">{project.client}</strong></span>
							</div>
							<div className="flex items-center gap-1.5">
								<UserCheck className="h-4 w-4 text-slate-400" />
								<span>Engagement Lead: <strong className="text-slate-800">{project.manager}</strong></span>
							</div>
							<div className="flex items-center gap-1.5">
								<Calendar className="h-4 w-4 text-slate-400" />
								<span>Next Due Target: <strong className="text-slate-800">{project.nextMilestoneDueDate}</strong></span>
							</div>
						</div>
					</div>

					{/* Overall Commercial Return Box */}
					<div className="rounded-2xl border-2 border-slate-900 bg-[#1A1A1A] p-5 text-white min-w-[240px]">
						<p className="text-[11px] font-bold uppercase tracking-wider text-[#FFE600]">Recognized Revenue</p>
						<p className="mt-1 text-3xl font-extrabold text-white">₹{project.revenueGenerated} Cr</p>
						<p className="mt-1 flex items-center text-xs font-bold text-emerald-400">
							<TrendingUp className="mr-1 h-3.5 w-3.5" />
							+₹{project.grossProfit} Cr Profit ({project.profitMargin}% Operating Margin)
						</p>
					</div>
				</div>

				{/* 2. Key Metric Stat Cards */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
						<div className="flex items-center justify-between text-slate-400">
							<span className="text-xs font-bold uppercase tracking-wider text-slate-600">Budget & Cost Burn</span>
							<DollarSign className="h-4 w-4 text-slate-600" />
						</div>
						<div className="mt-3">
							<p className="text-2xl font-extrabold text-slate-900">₹{project.spent} Cr</p>
							<p className="mt-1 text-xs text-slate-500 font-medium">
								Approved Budget: ₹{project.budget} Cr
							</p>
						</div>
					</div>

					<div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
						<div className="flex items-center justify-between text-slate-400">
							<span className="text-xs font-bold uppercase tracking-wider text-slate-600">Profit Margin</span>
							<Percent className="h-4 w-4 text-emerald-600" />
						</div>
						<div className="mt-3">
							<p className="text-2xl font-extrabold text-emerald-600">{project.profitMargin}%</p>
							<p className="mt-1 text-xs text-slate-500 font-medium">
								Realized Profit: ₹{project.grossProfit} Cr
							</p>
						</div>
					</div>

					<div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
						<div className="flex items-center justify-between text-slate-400">
							<span className="text-xs font-bold uppercase tracking-wider text-slate-600">Cash Collections</span>
							<CheckCircle2 className="h-4 w-4 text-sky-600" />
						</div>
						<div className="mt-3">
							<p className="text-2xl font-extrabold text-slate-900">₹{project.collectedAmount} Cr</p>
							<p className="mt-1 text-xs text-slate-500 font-medium">
								Pending Receivables: ₹{project.pendingReceivable} Cr
							</p>
						</div>
					</div>

					<div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
						<div className="flex items-center justify-between text-slate-400">
							<span className="text-xs font-bold uppercase tracking-wider text-slate-600">Risk Severity</span>
							<ShieldAlert className="h-4 w-4 text-rose-600" />
						</div>
						<div className="mt-3">
							<p className={`text-2xl font-extrabold capitalize ${
								project.riskSeverity === 'critical' ? 'text-rose-600' : project.riskSeverity === 'high' ? 'text-orange-600' : 'text-emerald-600'
							}`}>
								{project.riskSeverity} Risk
							</p>
							<p className="mt-1 text-xs text-slate-500 font-medium truncate" title={project.riskTitle}>
								Score: {project.riskScore} • {project.riskTitle}
							</p>
						</div>
					</div>
				</div>

				{/* 3. INFOGRAPHIC SECTION 1: Commercial Waterfall & Resource Workload Charts */}
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{/* Financial Waterfall Bar Chart */}
					<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-sm font-bold text-slate-900">Project Financial Waterfall (₹ Cr)</h3>
								<p className="text-xs text-slate-500">Commercial capital flow for {project.projectName}</p>
							</div>
							<span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
								₹{project.budget} Cr Total
							</span>
						</div>

						<div className="mt-4 h-[280px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={financialWaterfallData} margin={{ top: 25, right: 10, left: -15, bottom: 25 }}>
									<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
									<XAxis
										dataKey="stage"
										interval={0}
										tickLine={false}
										axisLine={false}
										tick={({ x, y, payload }) => {
											const words = String(payload.value).split(' ');
											return (
												<g transform={`translate(${x},${y})`}>
													<text x={0} y={10} textAnchor="middle" fill="#64748B" fontSize={10} fontWeight={600}>
														{words[0]}
													</text>
													{words.length > 1 && (
														<text x={0} y={22} textAnchor="middle" fill="#64748B" fontSize={10} fontWeight={600}>
															{words.slice(1).join(' ')}
														</text>
													)}
												</g>
											);
										}}
									/>
									<YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 10 }} tickFormatter={(v) => `₹${v}Cr`} />
									<Tooltip
										contentStyle={{
											backgroundColor: '#0F172A',
											border: 'none',
											borderRadius: '10px',
											color: '#FFFFFF',
											fontSize: '12px',
										}}
										formatter={(val) => [`₹${val} Cr`, 'Amount']}
									/>
									<Bar
										dataKey="value"
										radius={[4, 4, 0, 0]}
										label={{
											position: 'top',
											formatter: (val: number | string) => (Number(val) > 0 ? `₹${val}Cr` : ''),
											fontSize: 10,
											fill: '#475569',
											fontWeight: 700,
										}}
									>
										{financialWaterfallData.map((entry) => (
											<Cell key={entry.stage} fill={entry.fill} />
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* Staffed Team Allocation Breakdown */}
					<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-sm font-bold text-slate-900">Staffed Team Allocation & Workload</h3>
								<p className="text-xs text-slate-500">Staffing commitment across assigned practice leads</p>
							</div>
							<span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-bold text-sky-700 border border-sky-200">
								{displayResources.length} Consultants
							</span>
						</div>

						<div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
							<div className="h-[240px] w-full sm:w-1/2">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={resourceAllocationData}
											dataKey="allocation"
											nameKey="fullName"
											cx="50%"
											cy="50%"
											innerRadius={45}
											outerRadius={75}
											paddingAngle={3}
										>
											{resourceAllocationData.map((_, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Tooltip
											contentStyle={{
												backgroundColor: '#0F172A',
												border: 'none',
												borderRadius: '10px',
												color: '#FFFFFF',
												fontSize: '12px',
											}}
											formatter={(val) => [`${val}% Allocation`, 'Workload']}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>

							<div className="w-full sm:w-1/2 space-y-2.5">
								{resourceAllocationData.map((r, i) => (
									<div key={r.fullName} className="flex items-center justify-between text-xs">
										<div className="flex items-center gap-2">
											<span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
											<span className="font-semibold text-slate-800">{r.fullName}</span>
										</div>
										<span className="font-bold text-slate-900">{r.allocation}%</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* 4. INFOGRAPHIC SECTION 2: Milestone Progress Gauges */}
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
					<h3 className="text-sm font-bold text-slate-900 mb-1">Delivery Milestone Execution & Progress</h3>
					<p className="text-xs text-slate-500 mb-4">Phase-by-phase completion status and invoicing schedule for {project.projectName}</p>
					
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{milestones.map((m) => (
							<div key={m.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
								<div className="flex items-center justify-between text-xs">
									<span className="font-mono font-bold text-slate-500">{m.id}</span>
									<span className="font-bold text-slate-900">₹{m.amount} Cr</span>
								</div>
								<p className="mt-2 text-xs font-bold text-slate-800 line-clamp-2">{m.name}</p>
								
								<div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
									<span>Progress</span>
									<span className="font-bold text-slate-900">{Math.round(m.progress)}%</span>
								</div>
								<div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
									<div
										className="h-full bg-slate-900 rounded-full"
										style={{ width: `${m.progress}%` }}
									/>
								</div>

								<div className="mt-3 flex items-center justify-between text-[10px] font-semibold">
									<span className="text-slate-400">Due: {m.dueDate}</span>
									<span className={`rounded-full px-2 py-0.5 ${
										m.invoiceStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
									}`}>
										{m.invoiceStatus}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* 5. Invoicing & Milestone Schedule Table */}
				<div className="rounded-2xl border border-slate-200 overflow-hidden">
					<div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
						<div>
							<h3 className="text-sm font-bold text-slate-900">Invoicing & Milestone Payment Schedule</h3>
							<p className="text-xs text-slate-500">
								Contract billing terms: <strong>{project.billingModel}</strong> ({project.paymentTerms}) • Payment Status: <strong>{project.paymentStatus}</strong>
							</p>
						</div>
						<span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-[#FFE600]">
							Next Milestone: {project.nextMilestoneDueDate}
						</span>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="border-b border-slate-200 bg-slate-100/60 text-[11px] font-bold uppercase tracking-wider text-slate-500">
								<tr>
									<th className="px-6 py-3">Milestone Deliverable</th>
									<th className="px-6 py-3">Scheduled Value</th>
									<th className="px-6 py-3">Execution Status</th>
									<th className="px-6 py-3">Invoicing Status</th>
									<th className="px-6 py-3">Due Target</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100 text-slate-700">
								{milestones.map((m) => (
									<tr key={m.id} className="hover:bg-slate-50/50">
										<td className="px-6 py-3.5 font-semibold text-slate-900">
											<div className="flex items-center gap-2">
												<span className="font-mono text-slate-400">{m.id}</span>
												<span>{m.name}</span>
											</div>
										</td>
										<td className="px-6 py-3.5 font-bold text-slate-900">
											₹{m.amount} Cr
										</td>
										<td className="px-6 py-3.5">
											<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-bold text-[10px] uppercase ${
												m.status.includes('Completed') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700'
											}`}>
												{m.status}
											</span>
										</td>
										<td className="px-6 py-3.5">
											<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-bold text-[10px] ${
												m.invoiceStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : m.invoiceStatus === 'Invoiced' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-600'
											}`}>
												{m.invoiceStatus}
											</span>
										</td>
										<td className="px-6 py-3.5 font-mono text-slate-600">
											{m.dueDate}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* 6. Staffed Consultant Team & Resource Roster */}
				<div className="rounded-2xl border border-slate-200 overflow-hidden">
					<div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 flex items-center justify-between">
						<div>
							<h3 className="text-sm font-bold text-slate-900">Staffed Consultant Team & Resource Allocation</h3>
							<p className="text-xs text-slate-500">
								Expert practice consultants assigned to deliver technical and strategic deliverables.
							</p>
						</div>
						<div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
							<Users className="h-4 w-4 text-slate-400" />
							<span>{displayResources.length} Staffed Team Members</span>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="border-b border-slate-200 bg-slate-100/60 text-[11px] font-bold uppercase tracking-wider text-slate-500">
								<tr>
									<th className="px-6 py-3">Consultant Name</th>
									<th className="px-6 py-3">Role / Designation</th>
									<th className="px-6 py-3">Practice Department</th>
									<th className="px-6 py-3">Staffed Workload</th>
									<th className="px-6 py-3">Billable Rate</th>
									<th className="px-6 py-3">Core Skills & Competencies</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100 text-slate-700">
								{displayResources.map((res) => (
									<tr key={res.id} className="hover:bg-slate-50/50">
										<td className="px-6 py-3.5 font-bold text-slate-900">
											<div>
												<p>{res.name}</p>
												<p className="text-[11px] text-slate-400 font-normal">{res.email}</p>
											</div>
										</td>
										<td className="px-6 py-3.5 font-medium text-slate-800">
											{res.role}
										</td>
										<td className="px-6 py-3.5 text-slate-600">
											{res.department}
										</td>
										<td className="px-6 py-3.5">
											<span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700 border border-sky-200">
												{res.allocationPercentage}% Allocated
											</span>
										</td>
										<td className="px-6 py-3.5 font-bold text-slate-900">
											₹{res.billableRate}/hr
										</td>
										<td className="px-6 py-3.5">
											<div className="flex flex-wrap gap-1">
												{res.skills.map((skill) => (
													<span key={skill} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
														{skill}
													</span>
												))}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* 7. Project Risk Register & Governance Action Plan */}
				<div className="rounded-2xl border border-slate-200 overflow-hidden">
					<div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 flex items-center justify-between">
						<div>
							<h3 className="text-sm font-bold text-slate-900">Project Risk Register & Governance Action Plan</h3>
							<p className="text-xs text-slate-500">
								Active risks, mitigation protocols, probability/impact scores, and governance ownership.
							</p>
						</div>
						<span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-200">
							<AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
							{projectRisks.length > 0 ? `${projectRisks.length} Logged Risks` : '1 Identified Risk'}
						</span>
					</div>

					<div className="divide-y divide-slate-100 p-6 space-y-4">
						{(projectRisks.length > 0 ? projectRisks : [{
							id: 'r-default',
							riskId: 'RISK-0001',
							title: project.riskTitle,
							description: `Technical delivery, architecture alignment, and timeline tracking for ${project.projectName}.`,
							category: 'technical' as const,
							probability: 4,
							impact: 5,
							score: project.riskScore,
							severity: project.riskSeverity,
							status: 'open' as const,
							owner: project.manager,
							dueDate: project.nextMilestoneDueDate,
							mitigationPlan: 'Maintain weekly steering committee reviews, parallel validation pipelines, and backup senior architect staffing.',
						}]).map((risk) => (
							<div key={risk.id} className="rounded-xl border border-slate-200 bg-slate-50/40 p-4">
								<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
									<div className="flex items-center gap-2">
										<span className="font-mono text-xs font-bold text-slate-500">{risk.riskId}</span>
										<h4 className="text-sm font-bold text-slate-900">{risk.title}</h4>
									</div>
									<span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase ${
										risk.severity === 'critical' ? 'bg-rose-100 text-rose-800 border-rose-200' : risk.severity === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
									}`}>
										{risk.severity} Severity (Score: {risk.score})
									</span>
								</div>

								<p className="mt-2 text-xs text-slate-600">{risk.description}</p>

								<div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
									<p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Mitigation Protocol</p>
									<p className="mt-1 text-xs text-slate-700 font-medium">{risk.mitigationPlan}</p>
								</div>

								<div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
									<span>Category: <strong className="capitalize text-slate-700">{risk.category}</strong></span>
									<span>•</span>
									<span>Risk Owner: <strong className="text-slate-700">{risk.owner}</strong></span>
									<span>•</span>
									<span>Resolution Target: <strong className="text-slate-700">{risk.dueDate}</strong></span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Footer Print Sign-off (Only displays on print/PDF) */}
				<div className="hidden print:block border-t border-slate-300 pt-6 mt-8">
					<div className="flex justify-between items-center text-xs text-slate-600">
						<div>
							<p className="font-bold text-slate-900">EY Enterprise Platform</p>
							<p>Executive Project Dossier • Verified for Client Governance</p>
						</div>
						<div className="text-right">
							<p>Generated on: {new Date().toLocaleDateString()}</p>
							<p className="font-mono text-slate-400">Ref: {project.code}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectDossierExporter;
