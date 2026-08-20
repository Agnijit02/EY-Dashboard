import type { RiskSeverity } from '../risks/risks.types';

export type BillingModel = 'Milestone-Based' | 'Monthly Retainer' | 'Time & Material' | 'Fixed Fee';

export type PaymentStatus = 'Paid' | 'Pending Net-30' | 'Overdue Net-60' | 'Partially Invoiced';

export interface ProjectFinancialMetric {
	projectId: string;
	projectName: string;
	code: string;
	client: string;
	department: string;
	manager: string;
	budget: number; // ₹ Cr
	spent: number; // ₹ Cr
	revenueGenerated: number; // ₹ Cr
	grossProfit: number; // ₹ Cr
	profitMargin: number; // %
	riskSeverity: RiskSeverity;
	riskTitle: string;
	riskScore: number;
	billingModel: BillingModel;
	paymentStatus: PaymentStatus;
	invoicedAmount: number; // ₹ Cr
	collectedAmount: number; // ₹ Cr
	pendingReceivable: number; // ₹ Cr
	nextMilestoneDueDate: string;
	paymentTerms: string;
	progress: number;
}

export interface PortfolioAnalyticsSummary {
	totalBudget: number;
	totalSpent: number;
	totalRevenue: number;
	totalProfit: number;
	averageMargin: number;
	totalInvoiced: number;
	totalCollected: number;
	totalPending: number;
	highRiskProjectCount: number;
	overdueInvoicesCount: number;
}

export interface AnalyticsFilters {
	search: string;
	riskSeverity: RiskSeverity | 'all';
	paymentStatus: PaymentStatus | 'all';
	billingModel: BillingModel | 'all';
	department: string | 'all';
}