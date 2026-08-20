import { RotateCcw } from 'lucide-react';
import { Input } from '../../../components/common/Input';
import { useResourcesStore } from '../../../store/resourcesStore';
import type { AvailabilityStatus, ResourceDepartment, ResourceRole } from '../resources.types';

const departments: Array<ResourceDepartment | 'all'> = ['all', 'Technology', 'Consulting', 'Operations', 'Data', 'Design'];
const roles: Array<ResourceRole | 'all'> = [
	'all',
	'Senior Architect',
	'Project Manager',
	'Full Stack Engineer',
	'Data Scientist',
	'UX Designer',
	'DevOps Lead',
];
const availabilities: Array<AvailabilityStatus | 'all'> = ['all', 'available', 'partially-allocated', 'fully-allocated', 'over-allocated'];

function ResourceFilters() {
	const filters = useResourcesStore((state) => state.filters);
	const setSearch = useResourcesStore((state) => state.setSearch);
	const setDepartment = useResourcesStore((state) => state.setDepartment);
	const setRole = useResourcesStore((state) => state.setRole);
	const setAvailability = useResourcesStore((state) => state.setAvailability);
	const resetFilters = useResourcesStore((state) => state.resetFilters);

	const hasFilters =
		filters.search !== '' || filters.department !== 'all' || filters.role !== 'all' || filters.availability !== 'all';

	return (
		<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
				<div>
					<Input
						label="Search Resources"
						id="resource-search"
						type="search"
						value={filters.search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search by name, skill or project..."
					/>
				</div>

				<div>
					<label htmlFor="resource-department" className="mb-1.5 block text-xs font-medium text-slate-500">
						Department
					</label>
					<select
						id="resource-department"
						value={filters.department}
						onChange={(event) => setDepartment(event.target.value as ResourceDepartment | 'all')}
						className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
					>
						{departments.map((department) => (
							<option key={department} value={department}>
								{department === 'all' ? 'All Departments' : department}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="resource-role" className="mb-1.5 block text-xs font-medium text-slate-500">
						Role
					</label>
					<select
						id="resource-role"
						value={filters.role}
						onChange={(event) => setRole(event.target.value as ResourceRole | 'all')}
						className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
					>
						{roles.map((role) => (
							<option key={role} value={role}>
								{role === 'all' ? 'All Roles' : role}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="resource-availability" className="mb-1.5 block text-xs font-medium text-slate-500">
						Availability
					</label>
					<select
						id="resource-availability"
						value={filters.availability}
						onChange={(event) => setAvailability(event.target.value as AvailabilityStatus | 'all')}
						className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
					>
						{availabilities.map((availability) => (
							<option key={availability} value={availability}>
								{availability === 'all'
									? 'All Availability'
									: availability === 'partially-allocated'
										? 'Partially Allocated'
										: availability === 'fully-allocated'
											? 'Fully Allocated'
											: availability === 'over-allocated'
												? 'Over Allocated'
												: 'Available'}
							</option>
						))}
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

export default ResourceFilters;