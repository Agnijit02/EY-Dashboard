import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	content: string;
}

function Tooltip({ children, content }: Props) {
	return (
		<div className="group relative inline-flex">
			{children}
			<span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap bg-[#1A1A1A] px-2 py-1 text-[10px] font-medium text-white group-hover:inline-block">
				{content}
			</span>
		</div>
	);
}

export default Tooltip;
