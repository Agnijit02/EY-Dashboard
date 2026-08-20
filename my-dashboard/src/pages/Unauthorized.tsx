import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

function Unauthorized() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFE600] font-black text-[#1A1A1A] shadow-md">
          <ShieldAlert className="h-7 w-7" />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#1A1A1A]">
          Access restricted
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#737373]">
          You don't have permission to access this resource. Please contact your system administrator if you believe this is in error.
        </p>

        <div className="mt-6">
          <Link to="/dashboard">
            <Button variant="primary">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Unauthorized;