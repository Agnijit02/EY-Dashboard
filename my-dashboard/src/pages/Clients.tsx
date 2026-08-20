import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import Skeleton from '../components/ui/Skeleton';
import { useClientsQuery } from '../features/clients/clients.query';
import ClientDetailsDrawer from '../features/clients/components/ClientDetailsDrawer';
import ClientFilters from '../features/clients/components/ClientFilters';
import ClientTable from '../features/clients/components/ClientTable';
import ProjectPagination from '../features/projects/components/ProjectPagination';
import { useClientsStore } from '../store/clientsStore';

function Clients() {
	const filters = useClientsStore((state) => state.filters);
	const page = useClientsStore((state) => state.page);
	const pageSize = useClientsStore((state) => state.pageSize);
	const selectedClientId = useClientsStore((state) => state.selectedClientId);
	const setPage = useClientsStore((state) => state.setPage);
	const setSelectedClient = useClientsStore((state) => state.setSelectedClient);
	const resetFilters = useClientsStore((state) => state.resetFilters);

	const query = useClientsQuery({ filters, page, pageSize });

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
				title="Unable to load client portfolio"
				description="We encountered an error retrieving client relationships. Please try again."
				onRetry={() => query.refetch()}
			/>
		);
	}

	const data = query.data;
	const selectedClient = data?.clients.find((client) => client.id === selectedClientId) ?? null;

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<section>
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div>
						<h1 className="text-2xl font-semibold tracking-tight text-slate-900">Clients</h1>
						<p className="mt-1 text-sm text-slate-500">Client portfolio, account relationships, and total account revenue.</p>
					</div>
				</div>
			</section>

			{/* Filters */}
			<ClientFilters />

			{/* Results Summary */}
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium text-slate-900">{data?.pagination.total ?? 0} Clients</p>
				{query.isFetching ? <p className="text-xs text-slate-400">Updating...</p> : null}
			</div>

			{/* Client Table / Empty State */}
			{data && data.clients.length === 0 ? (
				<EmptyState
					title="No clients found"
					description="Try adjusting your search criteria or resetting filters."
					action={
						<Button variant="secondary" onClick={resetFilters}>
							Reset filters
						</Button>
					}
				/>
			) : data ? (
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
					<ClientTable clients={data.clients} onClientClick={(client) => setSelectedClient(client.id)} />

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
			<ClientDetailsDrawer client={selectedClient} onClose={() => setSelectedClient(null)} />
		</div>
	);
}

export default Clients;