import type { ReactNode } from 'react';

interface Props {
	title?: string;
	columns: string[];
	children: ReactNode;
	className?: string;
}

function DataTable({ title, columns, children, className = '' }: Props) {
	return (
		<div className={['overflow-hidden rounded-[28px] border border-[#E2E2E2] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]', className].join(' ')}>
			{title ? <div className="border-b border-[#E2E2E2] px-6 py-5"><h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#737373]">{title}</h3></div> : null}
			<div className="overflow-x-auto">
				<table className="w-full min-w-[700px]">
					<thead className="bg-[#F5F5F5]">
						<tr>
							{columns.map((column) => (
								<th key={column} className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[#737373]">
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-[#E5E5E5]">{children}</tbody>
				</table>
			</div>
		</div>
	);
}

export default DataTable;
