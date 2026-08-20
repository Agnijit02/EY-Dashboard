import type { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	padding?: 'none' | 'sm' | 'md' | 'lg';
}

function Card({ children, padding = 'md', className = '', ...props }: Props) {
	const paddingStyles = {
		none: '',
		sm: 'p-4',
		md: 'p-5',
		lg: 'p-6',
	};

	return (
		<div {...props} className={['overflow-hidden rounded-[28px] border border-[#E2E2E2] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]', paddingStyles[padding], className].join(' ')}>
			{children}
		</div>
	);
}

export default Card;
