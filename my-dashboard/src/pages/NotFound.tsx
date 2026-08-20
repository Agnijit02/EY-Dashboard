import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-6">
      <div className="max-w-md text-center">
        <div className="text-7xl font-bold tracking-tight text-[#1A1A1A]">
          404
        </div>

        <div className="mx-auto mt-4 h-1 w-12 bg-[#FFE600]" />

        <h1 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
          Page not found
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#737373]">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-6">
          <Link to="/dashboard">
            <Button variant="primary">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;