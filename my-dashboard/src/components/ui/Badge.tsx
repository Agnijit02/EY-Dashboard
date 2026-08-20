import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger';

interface Props {
	children: ReactNode;
	variant?: BadgeVariant;
}

function Badge({ children, variant = 'default' }: Props) {
	const variants: Record<BadgeVariant, string> = {
		default: 'bg-[#F5F5F5] text-[#525252]',
		accent: 'bg-[#FFE600] text-[#1A1A1A]',
		success: 'bg-[#F0F0F0] text-[#1A1A1A]',
		warning: 'bg-[#FFF7B8] text-[#525252]',
		danger: 'bg-[#FEE2E2] text-[#991B1B]',
	};

	return <span className={['inline-flex items-center px-2.5 py-1 text-xs font-semibold', variants[variant]].join(' ')}>{children}</span>;
}

export default Badge;
