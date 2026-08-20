import { Briefcase, Building, Calendar, DollarSign, Mail, MapPin, User, X } from 'lucide-react';
import { Drawer } from '../../../components/common/Drawer';
import type { Client } from '../clients.types';
import ClientStatusBadge from './ClientStatusBadge';

interface ClientDetailsDrawerProps {
	client: Client | null;
	onClose: () => void;
}

function ClientDetailsDrawer({ client, onClose }: ClientDetailsDrawerProps) {
	if (!client) {
		return null;
	}

	return (
		<Drawer open={Boolean(client)} onClose={onClose} title={client.name}>
			<div className="px-1">
				{/* Drawer Header */}
				<div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
					<div>
						<p className="text-xs font-medium text-slate-400">{client.code}</p>
						<h2 className="mt-1 text-xl font-semibold text-slate-900">{client.name}</h2>
						<p className="mt-1 text-sm font-medium text-slate-500">{client.industry} Industry</p>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
						aria-label="Close"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<div className="py-5">
					<ClientStatusBadge status={client.status} />

					<p className="mt-4 text-sm leading-6 text-slate-600">{client.description}</p>

					{/* Metric Cards */}
					<div className="mt-7 grid grid-cols-2 gap-3">
						<div className="rounded-xl border border-slate-200 p-4">
							<DollarSign className="h-5 w-5 text-emerald-600" />
							<p className="mt-3 text-xs text-slate-400">Total Account Revenue</p>
							<p className="mt-1 text-xl font-bold text-slate-900">₹{client.totalRevenue} Cr</p>
						</div>

						<div className="rounded-xl border border-slate-200 p-4">
							<Briefcase className="h-5 w-5 text-blue-600" />
							<p className="mt-3 text-xs text-slate-400">Active Projects</p>
							<p className="mt-1 text-xl font-bold text-slate-900">{client.activeProjects}</p>
						</div>
					</div>

					{/* Client Info Summary */}
					<div className="mt-7">
						<h3 className="text-sm font-semibold text-slate-900">Client Information</h3>

						<dl className="mt-3 divide-y divide-slate-100 border-y border-slate-100">
							<div className="flex justify-between py-3">
								<dt className="flex items-center gap-2 text-sm text-slate-500">
									<User className="h-4 w-4 text-slate-400" />
									Account Manager
								</dt>
								<dd className="text-sm font-medium text-slate-900">{client.accountManager}</dd>
							</div>

							<div className="flex justify-between py-3">
								<dt className="flex items-center gap-2 text-sm text-slate-500">
									<Building className="h-4 w-4 text-slate-400" />
									Primary Contact
								</dt>
								<dd className="text-sm font-medium text-slate-900">{client.primaryContact}</dd>
							</div>

							<div className="flex justify-between py-3">
								<dt className="flex items-center gap-2 text-sm text-slate-500">
									<Mail className="h-4 w-4 text-slate-400" />
									Contact Email
								</dt>
								<dd className="text-sm font-medium text-slate-900">{client.email}</dd>
							</div>

							<div className="flex justify-between py-3">
								<dt className="flex items-center gap-2 text-sm text-slate-500">
									<MapPin className="h-4 w-4 text-slate-400" />
									Location
								</dt>
								<dd className="text-sm font-medium text-slate-900">{client.location}</dd>
							</div>

							<div className="flex justify-between py-3">
								<dt className="flex items-center gap-2 text-sm text-slate-500">
									<Calendar className="h-4 w-4 text-slate-400" />
									Client Since
								</dt>
								<dd className="text-sm font-medium text-slate-900">{client.joinedDate}</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</Drawer>
	);
}

export default ClientDetailsDrawer;