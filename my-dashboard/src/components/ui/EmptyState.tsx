import type { ReactNode } from 'react';

interface Props {
	title: string;
	description: string;
	action?: ReactNode;
}

function EmptyState({ title, description, action }: Props) {
	return (
		<div className="flex flex-col items-center justify-center border border-dashed border-[#D4D4D4] bg-white px-6 py-16 text-center">
			<div className="h-2 w-2 bg-[#FFE600]" />
			<h3 className="mt-4 text-sm font-semibold text-[#1A1A1A]">{title}</h3>
			<p className="mt-2 max-w-sm text-sm leading-6 text-[#737373]">{description}</p>
			{action ? <div className="mt-5">{action}</div> : null}
		</div>
	);
}

export default EmptyState;
