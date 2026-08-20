import type { ReactNode } from 'react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onRetry?: () => void;
  icon?: ReactNode;
}

export function ErrorState({
  title = 'Unable to load data',
  description = 'Something went wrong while fetching the requested information.',
  actionLabel = 'Retry',
  onRetry,
  icon,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-6 py-10 text-center">
      {icon ? <div className="mb-4 text-rose-400">{icon}</div> : null}
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-600">{description}</p>
      {onRetry ? (
        <Button className="mt-5" variant="danger" onClick={onRetry}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export default ErrorState;