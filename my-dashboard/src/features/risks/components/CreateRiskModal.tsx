import { X } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import RiskForm from './RiskForm';
import type { CreateRiskPayload } from '../risks.types';

interface CreateRiskModalProps {
	open: boolean;
	isSubmitting?: boolean;
	onSubmit: (payload: CreateRiskPayload) => void;
	onClose: () => void;
}

function CreateRiskModal({ open, isSubmitting = false, onSubmit, onClose }: CreateRiskModalProps) {
	const { canManage } = useAuth();

	if (!open || !canManage) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
				onClick={() => {
					if (!isSubmitting) onClose();
				}}
			/>

			{/* Modal Container */}
			<div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
				{/* Modal Header */}
				<div className="flex items-center justify-between border-b border-slate-100 pb-4">
					<div>
						<h2 className="text-xl font-bold tracking-tight text-slate-900">Add Governance Risk</h2>
						<p className="mt-0.5 text-xs text-slate-500">
							Log a delivery, security, financial, or operational risk into the enterprise risk register.
						</p>
					</div>

					<button
						type="button"
						onClick={onClose}
						disabled={isSubmitting}
						className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Modal Form */}
				<div className="mt-5">
					<RiskForm isSubmitting={isSubmitting} onSubmit={onSubmit} onCancel={onClose} />
				</div>
			</div>
		</div>
	);
}

export default CreateRiskModal;
