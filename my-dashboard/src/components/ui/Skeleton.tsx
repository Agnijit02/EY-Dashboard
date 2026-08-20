interface Props {
	className?: string;
}

function Skeleton({ className = '' }: Props) {
	return <div className={['animate-pulse bg-[#E5E5E5]', className].join(' ')} />;
}

export default Skeleton;
