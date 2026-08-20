import { RotateCcw } from 'lucide-react';
import { Input } from '../../../components/common/Input';
import { useClientsStore } from '../../../store/clientsStore';
import type { ClientStatus, Industry } from '../clients.types';

const industries: Array<Industry | 'all'> = ['all', 'Technology', 'Financial', 'Healthcare', 'Consulting', 'Retail'];

function ClientFilters() {
	const filters = useClientsStore((state) => state.filters);
	const setSearch = useClientsStore((state) => state.setSearch);
	const setIndustry = useClientsStore((state) => state.setIndustry);
	const setStatus = useClientsStore((state) => state.setStatus);
	const resetFilters = useClientsStore((state) => state.resetFilters);

	const hasFilters = filters.search !== '' || filters.industry !== 'all' || filters.status !== 'all';

	return (
		<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div>
					<Input
						label="Search Clients"
						id="client-search"
						type="search"
						value={filters.search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search by client, code, or manager..."
					/>
				</div>

				<div>
					<label htmlFor="client-industry" className="mb-1.5 block text-xs font-medium text-slate-500">
						Industry
					</label>
					<select
						id="client-industry"
						value={filters.industry}
						onChange={(event) => setIndustry(event.target.value as Industry | 'all')}
						className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
					>
						{industries.map((ind) => (
							<option key={ind} value={ind}>
								{ind === 'all' ? 'All Industries' : ind}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="client-status" className="mb-1.5 block text-xs font-medium text-slate-500">
						Status
					</label>
					<select
						id="client-status"
						value={filters.status}
						onChange={(event) => setStatus(event.target.value as ClientStatus | 'all')}
						className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
					>
						<option value="all">All Statuses</option>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
						<option value="at-risk">At Risk</option>
					</select>
				</div>
			</div>

			{hasFilters ? (
				<div className="mt-3 flex justify-end">
					<button
						type="button"
						onClick={resetFilters}
						className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900"
					>
						<RotateCcw className="h-3.5 w-3.5" />
						Reset filters
					</button>
				</div>
			) : null}
		</div>
	);
}

export default ClientFilters;