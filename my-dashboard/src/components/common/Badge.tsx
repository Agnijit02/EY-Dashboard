import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 border-slate-200/80',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  warning: 'bg-[#FFE600]/15 text-[#8a7d00] border-[#FFE600]/30',
  danger: 'bg-rose-50 text-rose-700 border-rose-200/60',
  info: 'bg-sky-50 text-sky-700 border-sky-200/60',
  neutral: 'bg-slate-50 text-slate-600 border-slate-200/60',
};

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold tracking-wide whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

export default Badge;