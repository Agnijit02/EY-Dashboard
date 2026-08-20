import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helperText, id, className, required, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = error || helperText ? `${inputId}-description` : undefined;

  return (
    <label className="flex w-full flex-col gap-1.5 text-sm text-slate-700" htmlFor={inputId}>
      {label ? (
        <span className="text-[13px] font-semibold text-slate-800">
          {label}
          {required ? <span className="ml-1 text-rose-500">*</span> : null}
        </span>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        required={required}
        className={cn(
          'h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#1A1A1A] focus:shadow-[0_0_0_3px_rgba(255,230,0,0.12)] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
          error && 'border-rose-300 focus:border-rose-500 focus:shadow-[0_0_0_3px_rgba(225,29,72,0.08)]',
          className,
        )}
        {...props}
      />
      {error ? (
        <span id={descriptionId} className="text-xs font-medium text-rose-600">
          {error}
        </span>
      ) : helperText ? (
        <span id={descriptionId} className="text-xs text-slate-500">
          {helperText}
        </span>
      ) : null}
    </label>
  );
});

export default Input;