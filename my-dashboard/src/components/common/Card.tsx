import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type CardVariant = 'default' | 'glass' | 'elevated' | 'dark';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)]',
  glass: 'border border-white/20 bg-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl',
  elevated: 'border border-slate-200/60 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.03)]',
  dark: 'border border-white/[0.06] bg-[linear-gradient(135deg,#111111_0%,#1a1a1a_55%,#222_100%)] text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]',
};

export function Card({ variant = 'default', className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 border-b border-slate-200/60 px-6 py-5', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-base font-semibold tracking-tight text-slate-900', className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-slate-500', className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 py-5', className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center border-t border-slate-200/60 px-6 py-5', className)} {...props} />;
}

export default Card;