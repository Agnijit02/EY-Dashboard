import type { AvailabilityStatus } from '../resources.types';

interface ResourceStatusBadgeProps {
	status: AvailabilityStatus;
}

const statusConfig: Record<AvailabilityStatus, { label: string; className: string }> = {
	available: { label: 'Available', className: 'bg-emerald-50 text-emerald-700' },
	'partially-allocated': { label: 'Partially Allocated', className: 'bg-amber-50 text-amber-700' },
	'fully-allocated': { label: 'Fully Allocated', className: 'bg-sky-50 text-sky-700' },
	'over-allocated': { label: 'Over Allocated', className: 'bg-rose-50 text-rose-700' },
};

function ResourceStatusBadge({ status }: ResourceStatusBadgeProps) {
	const config = statusConfig[status];

	return (
		<span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}>
			<span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
			{config.label}
		</span>
	);
}

export default ResourceStatusBadge;
