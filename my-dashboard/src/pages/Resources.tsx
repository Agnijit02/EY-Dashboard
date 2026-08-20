import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import Skeleton from '../components/ui/Skeleton';
import ProjectPagination from '../features/projects/components/ProjectPagination';
import CreateResourceModal from '../features/resources/components/CreateResourceModal';
import ResourceDetailsDrawer from '../features/resources/components/ResourceDetailsDrawer';
import ResourceFilters from '../features/resources/components/ResourceFilters';
import ResourceTable from '../features/resources/components/ResourceTable';
import { useResourcesQuery } from '../features/resources/resources.query';
import type { CreateResourcePayload } from '../features/resources/resources.types';
import { useAuth } from '../hooks/useAuth';
import { useResourceMutations } from '../hooks/useResourceMutations';
import { useResourcesStore } from '../store/resourcesStore';

function Resources() {
	const { canManage } = useAuth();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const { createMutation } = useResourceMutations();

	const filters = useResourcesStore((state) => state.filters);
	const page = useResourcesStore((state) => state.page);
	const pageSize = useResourcesStore((state) => state.pageSize);
	const selectedResourceId = useResourcesStore((state) => state.selectedResourceId);
	const setPage = useResourcesStore((state) => state.setPage);
	const setSelectedResource = useResourcesStore((state) => state.setSelectedResource);
	const resetFilters = useResourcesStore((state) => state.resetFilters);

	const query = useResourcesQuery({ filters, page, pageSize });

	const handleCreateResource = (payload: CreateResourcePayload) => {
		createMutation.mutate(payload, {
			onSuccess: (newRes) => {
				setIsCreateModalOpen(false);
				toast.success(`Resource "${newRes.name}" enrolled successfully`);
			},
			onError: (err) => {
				toast.error(err instanceof Error ? err.message : 'Failed to add resource');
			},
		});
	};

	if (query.isLoading) {
		return (
			<div className="space-y-4">
				<Skeleton className="h-12 w-48 rounded-xl" />
				<Skeleton className="h-20 w-full rounded-xl" />
				<Skeleton className="h-96 w-full rounded-xl" />
			</div>
		);
	}

	if (query.isError) {
		return (
			<ErrorState
				title="Unable to load resources"
				description="We couldn't retrieve team resource allocation data. Please try again."
				onRetry={() => query.refetch()}
			/>
		);
	}

	const data = query.data;
	const selectedResource = data?.resources.find((resource) => resource.id === selectedResourceId) ?? null;

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<section>
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div>
						<h1 className="text-2xl font-semibold tracking-tight text-slate-900">Resources</h1>
						<p className="mt-1 text-sm text-slate-500">
							Resource allocation, skill matrix, and capacity utilization across delivery teams.
						</p>
					</div>

					<div className="flex items-center gap-3">
						{canManage ? (
							<Button
								variant="accent"
								icon={<Plus className="h-4 w-4" />}
								onClick={() => setIsCreateModalOpen(true)}
							>
								Add Resource
							</Button>
						) : (
							<span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
								Read-Only Access
							</span>
						)}
					</div>
				</div>
			</section>

			{/* Filters */}
			<ResourceFilters />

			{/* Results Summary */}
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium text-slate-900">{data?.pagination.total ?? 0} Resources</p>
				{query.isFetching ? <p className="text-xs text-slate-400">Updating...</p> : null}
			</div>

			{/* Resource Table / Empty State */}
			{data && data.resources.length === 0 ? (
				<EmptyState
					title="No resources found"
					description="Try adjusting your search criteria or resetting filters."
					action={
						<Button variant="secondary" onClick={resetFilters}>
							Reset filters
						</Button>
					}
				/>
			) : data ? (
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
					<ResourceTable resources={data.resources} onResourceClick={(resource) => setSelectedResource(resource.id)} />

					<ProjectPagination
						page={data.pagination.page}
						totalPages={data.pagination.totalPages}
						total={data.pagination.total}
						pageSize={data.pagination.pageSize}
						onPageChange={setPage}
					/>
				</div>
			) : null}

			{/* Details Drawer */}
			<ResourceDetailsDrawer resource={selectedResource} onClose={() => setSelectedResource(null)} />

			{/* Add Resource Modal */}
			<CreateResourceModal
				open={isCreateModalOpen}
				isSubmitting={createMutation.isPending}
				onSubmit={handleCreateResource}
				onClose={() => {
					if (!createMutation.isPending) {
						setIsCreateModalOpen(false);
					}
				}}
			/>
		</div>
	);
}

export default Resources;