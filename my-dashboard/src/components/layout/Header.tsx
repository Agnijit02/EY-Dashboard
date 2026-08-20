import { Bell, Menu, Search, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import UserMenu from './UserMenu';

function Header() {
  const location = useLocation();
  const setMobileSidebarOpen = useUIStore((state) => state.setMobileSidebarOpen);

  const pageLabel = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' / ');

  return (
    <header className="relative flex h-16 shrink-0 items-center justify-between bg-white px-4 lg:px-6">
      {/* Bottom gradient border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e2e2e2] to-transparent" />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="rounded-lg p-2 text-[#525252] transition-colors hover:bg-[#F5F5F5] hover:text-[#1A1A1A] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-2.5 md:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFE600]/10">
            <Sparkles className="h-3.5 w-3.5 text-[#b8a600]" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#1A1A1A]">{pageLabel || 'Dashboard'}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden w-64 md:block lg:w-72">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a3a3a3]" />
            <input
              type="search"
              placeholder="Search anything..."
              className="h-9 w-full rounded-xl border border-[#e5e5e5] bg-[#fafafa] pl-9 pr-3 text-sm text-[#1A1A1A] outline-none transition-all duration-200 placeholder:text-[#a3a3a3] focus:border-[#1A1A1A] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,230,0,0.12)]"
            />
          </div>
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-xl p-2.5 text-[#737373] transition-colors hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="animate-dot-pulse absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FFE600] shadow-[0_0_6px_rgba(255,230,0,0.5)]" />
        </button>

        {/* User */}
        <div className="ml-1 border-l border-[#e5e5e5] pl-3">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;