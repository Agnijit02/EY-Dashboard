import type { ReactNode } from 'react';

interface Props {
	trigger: ReactNode;
	children: ReactNode;
	className?: string;
}

function Dropdown({ trigger, children, className = '' }: Props) {
	return (
		<div className={['relative', className].join(' ')}>
			{trigger}
			<div className="absolute right-0 top-full z-20 mt-2 min-w-52 border border-[#E2E2E2] bg-white p-2 shadow-lg">{children}</div>
		</div>
	);
}

export default Dropdown;
