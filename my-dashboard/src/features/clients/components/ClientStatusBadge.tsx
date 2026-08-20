import type { ClientStatus } from '../clients.types';

interface ClientStatusBadgeProps {
	status: ClientStatus;
}

const statusStyles: Record<ClientStatus, { label: string; dotClass: string; bgClass: string }> = {
	active: {
		label: 'Active',
		dotClass: 'bg-emerald-500',
		bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
	},
	inactive: {
		label: 'Inactive',
		dotClass: 'bg-slate-400',
		bgClass: 'bg-slate-50 text-slate-600 border-slate-200',
	},
	'at-risk': {
		label: 'At Risk',
		dotClass: 'bg-amber-500',
		bgClass: 'bg-amber-50 text-amber-700 border-amber-200',
	},
};

function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
	const config = statusStyles[status] || statusStyles.active;

	return (
		<span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.bgClass}`}>
			<span className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
			{config.label}
		</span>
	);
}

export default ClientStatusBadge;
