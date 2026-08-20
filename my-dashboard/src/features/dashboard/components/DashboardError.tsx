import { AlertCircle, RefreshCw } from 'lucide-react';

interface DashboardErrorProps {
  message: string;
  onRetry: () => void;
}

function DashboardError({ message, onRetry }: DashboardErrorProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertCircle className="h-6 w-6" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900">Unable to load dashboard</h2>

        <p className="mt-2 text-sm text-slate-500">{message}</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}

export default DashboardError;