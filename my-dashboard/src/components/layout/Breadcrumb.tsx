import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#737373]">
      <Link to="/dashboard" className="flex items-center gap-1 transition-colors hover:text-[#1A1A1A]">
        <Home className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        const isLast = index === segments.length - 1;

        return (
          <div key={path} className="flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 text-[#A3A3A3]" />
            {isLast ? (
              <span className="font-semibold text-[#1A1A1A]">{label}</span>
            ) : (
              <Link to={path} className="transition-colors hover:text-[#1A1A1A]">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;