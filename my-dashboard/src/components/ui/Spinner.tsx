interface Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function Spinner({ size = 'md', className = '' }: Props) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-5 w-5 border-2',
    lg: 'h-8 w-8 border-3',
  };

  return (
    <span
      role="status"
      aria-label="Loading"
      className={[
        'inline-block animate-spin rounded-full border-[#E2E2E2] border-t-[#1A1A1A]',
        sizes[size],
        className,
      ].join(' ')}
    />
  );
}

export default Spinner;
