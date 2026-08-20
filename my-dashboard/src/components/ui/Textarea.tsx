import type { TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
}

function Textarea({ label, error, className = '', ...props }: Props) {
	return (
		<div className="space-y-1.5">
			{label ? <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#525252]">{label}</label> : null}
			<textarea
				{...props}
				className={['min-h-[120px] w-full border border-[#D4D4D4] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none transition placeholder:text-[#A3A3A3] focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]', className].join(' ')}
			/>
			{error ? <p className="text-xs text-red-600">{error}</p> : null}
		</div>
	);
}

export default Textarea;
