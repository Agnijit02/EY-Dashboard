interface Props {
	message: string;
	type?: 'success' | 'info' | 'error';
}

function Toast({ message, type = 'info' }: Props) {
	const colors = {
		success: 'border-[#D4D4D4] bg-[#F5F5F5] text-[#1A1A1A]',
		info: 'border-[#D4D4D4] bg-white text-[#1A1A1A]',
		error: 'border-red-200 bg-red-50 text-red-700',
	};

	return <div className={['border px-3 py-2 text-sm', colors[type]].join(' ')}>{message}</div>;
}

export default Toast;
