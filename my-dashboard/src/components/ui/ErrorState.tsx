import { AlertCircle, RefreshCcw } from 'lucide-react';
import Button from './Button';

interface Props {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load this information. Please try again.",
  onRetry,
}: Props) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E2E2] bg-white px-6 py-16 text-center shadow-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
        <AlertCircle className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-[#1A1A1A]">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#737373]">
        {description}
      </p>

      {onRetry && (
        <div className="mt-6">
          <Button
            variant="secondary"
            icon={<RefreshCcw className="h-4 w-4" />}
            onClick={onRetry}
          >
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}

export default ErrorState;
