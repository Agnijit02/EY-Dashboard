import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
	loading?: boolean;
	isLoading?: boolean;
	icon?: ReactNode;
}

function Button({ children, variant = 'primary', loading = false, isLoading = false, icon, disabled, className = '', ...props }: ButtonProps) {
	const isCurrentlyLoading = loading || isLoading;

	const variants: Record<ButtonVariant, string> = {
		primary: 'bg-[#1A1A1A] text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-[#2a2a2a] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]',
		secondary: 'border border-[#e5e5e5] bg-white text-[#1A1A1A] shadow-sm hover:bg-[#fafafa] hover:border-[#d4d4d4]',
		ghost: 'text-[#525252] hover:bg-[#F5F5F5]',
		danger: 'border border-red-200 bg-white text-red-600 shadow-sm hover:bg-red-50',
		accent: 'bg-[#FFE600] text-[#1A1A1A] shadow-[0_4px_14px_rgba(255,230,0,0.25)] hover:bg-[#f0d900] hover:shadow-[0_8px_25px_rgba(255,230,0,0.3)]',
	};

	return (
		<button
			type={props.type || 'button'}
			{...props}
			disabled={disabled || isCurrentlyLoading}
			aria-busy={isCurrentlyLoading}
			className={[
				'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-all duration-200',
				'focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE600] focus-visible:ring-offset-1',
				'disabled:cursor-not-allowed disabled:opacity-50',
				variants[variant],
				className,
			].join(' ')}
		>
			{isCurrentlyLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
			{children}
		</button>
	);
}

export default Button;
