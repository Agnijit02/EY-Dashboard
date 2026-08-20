import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface Props {
	open: boolean;
	title: string;
	description: string;
	confirmLabel?: string;
	loading?: boolean;
	onCancel: () => void;
	onConfirm: () => void;
}

function ConfirmDialog({ open, title, description, confirmLabel = 'Delete', loading = false, onCancel, onConfirm }: Props) {
	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
			<button type="button" onClick={onCancel} className="absolute inset-0 bg-black/50" aria-label="Close confirmation" />
			<div className="relative w-full max-w-md bg-white p-6 shadow-2xl">
				<div className="flex gap-4">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FFF7B8]">
						<AlertTriangle className="h-5 w-5 text-[#1A1A1A]" />
					</div>
					<div>
						<h2 className="font-semibold text-[#1A1A1A]">{title}</h2>
						<p className="mt-2 text-sm leading-6 text-[#666666]">{description}</p>
					</div>
				</div>
				<div className="mt-6 flex justify-end gap-2">
					<Button variant="secondary" onClick={onCancel}>Cancel</Button>
					<Button variant="danger" loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmDialog;
