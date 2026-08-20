import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

function Input({ label, error, className = '', ...props }: Props) {
	return (
		<div className="space-y-1.5">
			{label ? <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#525252]">{label}</label> : null}
			<input
				{...props}
				className={[
					'h-11 w-full rounded-2xl border border-[#D4D4D4] bg-white px-3.5 text-sm text-[#1A1A1A] outline-none transition placeholder:text-[#A3A3A3] focus:border-[#1A1A1A] focus:ring-2 focus:ring-[#FFE600]/30',
					className,
				].join(' ')}
			/>
			{error ? <p className="text-xs text-red-600">{error}</p> : null}
		</div>
	);
}

export default Input;
