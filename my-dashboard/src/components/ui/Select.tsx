import type { SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
}

function Select({ label, children, className = '', ...props }: Props) {
	return (
		<div className="space-y-1.5">
			{label ? <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#525252]">{label}</label> : null}
			<select
				{...props}
				className={['h-11 w-full rounded-2xl border border-[#D4D4D4] bg-white px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1A1A1A] focus:ring-2 focus:ring-[#FFE600]/30', className].join(' ')}
			>
				{children}
			</select>
		</div>
	);
}

export default Select;
