import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
	open: boolean;
	title: string;
	description?: string;
	children: ReactNode;
	onClose: () => void;
	maxWidth?: string;
}

function Modal({ open, title, description, children, onClose, maxWidth = 'max-w-2xl' }: Props) {
	useEffect(() => {
		if (!open) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = prevOverflow;
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [open, onClose]);

	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
			<button
				type="button"
				aria-label="Close modal backdrop"
				onClick={onClose}
				className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
			/>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
				className={['relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all', maxWidth].join(' ')}
			>
				<div className="flex items-start justify-between border-b border-[#E2E2E2] px-6 py-5">
					<div>
						<h2 id="modal-title" className="text-lg font-semibold text-[#1A1A1A]">{title}</h2>
						{description ? <p className="mt-1 text-xs text-[#737373]">{description}</p> : null}
					</div>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg p-2 text-[#737373] transition-colors hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
						aria-label="Close modal"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
				<div className="overflow-y-auto p-6">{children}</div>
			</div>
		</div>
	);
}

export default Modal;
