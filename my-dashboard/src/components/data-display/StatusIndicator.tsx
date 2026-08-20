interface Props {
	label: string;
	status: 'success' | 'warning' | 'danger' | 'neutral';
}

function StatusIndicator({ label, status }: Props) {
	const dot = {
		success: 'bg-[#1A1A1A]',
		warning: 'bg-[#FFE600]',
		danger: 'bg-red-600',
		neutral: 'bg-[#A3A3A3]',
	};

	return (
		<span className="inline-flex items-center gap-2 text-xs font-medium text-[#525252]">
			<span className={['h-2 w-2 rounded-full', dot[status]].join(' ')} />
			{label}
		</span>
	);
}

export default StatusIndicator;
