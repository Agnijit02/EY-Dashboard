import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
	open: boolean;
	title: string;
	onClose: () => void;
	children: ReactNode;
}

function Drawer({ open, title, onClose, children }: Props) {
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
		<div className="fixed inset-0 z-[90] flex justify-end bg-[#1A1A1A]/40 backdrop-blur-xs">
			<button
				type="button"
				aria-label="Close drawer backdrop"
				onClick={onClose}
				className="absolute inset-0 cursor-default bg-transparent"
			/>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="drawer-title"
				className="relative z-10 h-full w-full max-w-lg border-l border-[#E2E2E2] bg-white shadow-2xl transition-transform"
			>
				<div className="flex items-center justify-between border-b border-[#E2E2E2] px-6 py-4">
					<h2 id="drawer-title" className="text-lg font-semibold text-[#1A1A1A]">{title}</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg p-2 text-[#737373] transition-colors hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
						aria-label="Close drawer"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
				<div className="h-[calc(100%-73px)] overflow-y-auto p-6">{children}</div>
			</div>
		</div>
	);
}

export default Drawer;
