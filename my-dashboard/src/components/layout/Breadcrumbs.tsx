import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const labels: Record<string, string> = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  projects: 'Projects',
  clients: 'Clients',
  resources: 'Resources',
  risks: 'Risks',
  reports: 'Reports',
};

function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-xs text-[#737373]">
        <li>
          <Link to="/dashboard" className="transition-colors hover:text-[#1A1A1A]">
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          const label = labels[segment.toLowerCase()] ?? segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={path} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 text-[#A3A3A3]" />
              {isLast ? (
                <span aria-current="page" className="font-semibold text-[#1A1A1A]">
                  {label}
                </span>
              ) : (
                <Link to={path} className="transition-colors hover:text-[#1A1A1A]">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
