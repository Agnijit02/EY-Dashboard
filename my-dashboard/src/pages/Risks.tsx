import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import Skeleton from '../components/ui/Skeleton';
import ProjectPagination from '../features/projects/components/ProjectPagination';
import CreateRiskModal from '../features/risks/components/CreateRiskModal';
import RiskDetailsDrawer from '../features/risks/components/RiskDetailsDrawer';
import RiskFilters from '../features/risks/components/RiskFilters';
import RiskHeatmap from '../features/risks/components/RiskHeatmap';
import RiskSummaryCards from '../features/risks/components/RiskSummaryCards';
import RiskTable from '../features/risks/components/RiskTable';
import type { CreateRiskPayload, Risk, RiskFilters as RiskFiltersType } from '../features/risks/risks.types';
import { useAuth } from '../hooks/useAuth';
import { useDebounce } from '../hooks/useDebounce';
import { useRiskMutations } from '../hooks/useRiskMutations';
import { useRisksQuery } from '../hooks/useRisksQuery';

const initialFilters: RiskFiltersType = {
	search: '',
	severity: 'all',
	status: 'all',
	category: 'all',
};

function Risks() {
	const { canManage } = useAuth();
	const [filters, setFilters] = useState<RiskFiltersType>(initialFilters);
	const [page, setPage] = useState(1);
	const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const pageSize = 8;

	const { createMutation } = useRiskMutations();

	const debouncedSearch = useDebounce(filters.search, 300);

	const effectiveFilters = useMemo(
		() => ({
			...filters,
			search: debouncedSearch,
		}),
		[filters, debouncedSearch],
	);

	const { data, isLoading, isError, refetch } = useRisksQuery({ filters: effectiveFilters, page, pageSize });
	const risks = useMemo(() => data?.risks ?? [], [data?.risks]);

	const summary = useMemo(() => {
		return {
			total: risks.filter((risk) => risk.status !== 'closed').length,
			critical: risks.filter((risk) => risk.severity === 'critical').length,
			high: risks.filter((risk) => risk.severity === 'high').length,
			overdue: risks.filter((risk) => new Date(risk.dueDate) < new Date() && risk.status !== 'closed').length,
		};
	}, [risks]);

	const handleCreateRisk = (payload: CreateRiskPayload) => {
		createMutation.mutate(payload, {
			onSuccess: (newRisk) => {
				setIsCreateModalOpen(false);
				toast.success(`Risk "${newRisk.title}" registered successfully`);
			},
			onError: (err) => {
				toast.error(err instanceof Error ? err.message : 'Failed to register risk');
			},
		});
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Governance & Controls</p>
					<h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Risk Management</h1>
					<p className="mt-1 text-sm text-slate-500">Monitor project risks, mitigation plans and delivery exposure.</p>
				</div>

				{canManage ? (
					<Button
						variant="primary"
						icon={<Plus className="h-4 w-4" />}
						onClick={() => setIsCreateModalOpen(true)}
					>
						Add Risk
					</Button>
				) : (
					<span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
						Read-Only Access
					</span>
				)}
			</div>

			<RiskSummaryCards total={summary.total} critical={summary.critical} high={summary.high} overdue={summary.overdue} />

			<RiskHeatmap risks={risks} />

			<RiskFilters
				filters={filters}
				onChange={(value) => {
					setFilters(value);
					setPage(1);
				}}
			/>

			{isError ? (
				<ErrorState
					title="Unable to load risk register"
					description="We encountered a problem fetching risk governance data. Please try again."
					onRetry={() => refetch()}
				/>
			) : isLoading ? (
				<div className="space-y-3">
					<Skeleton className="h-12 w-full rounded-xl" />
					<Skeleton className="h-64 w-full rounded-xl" />
				</div>
			) : risks.length === 0 ? (
				<EmptyState
					title="No risks found"
					description="Try adjusting your filter criteria or search query to find relevant risks."
					action={
						<Button
							variant="secondary"
							onClick={() => setFilters(initialFilters)}
						>
							Reset Filters
						</Button>
					}
				/>
			) : (
				<div className="space-y-4">
					<RiskTable risks={risks} onSelect={(risk) => setSelectedRisk(risk)} />
					{data ? (
						<ProjectPagination
							page={data.pagination.page}
							totalPages={data.pagination.totalPages}
							total={data.pagination.total}
							pageSize={data.pagination.pageSize}
							onPageChange={setPage}
						/>
					) : null}
				</div>
			)}

			<RiskDetailsDrawer risk={selectedRisk} onClose={() => setSelectedRisk(null)} />

			<CreateRiskModal
				open={isCreateModalOpen}
				isSubmitting={createMutation.isPending}
				onSubmit={handleCreateRisk}
				onClose={() => {
					if (!createMutation.isPending) {
						setIsCreateModalOpen(false);
					}
				}}
			/>
		</div>
	);
}

export default Risks;
