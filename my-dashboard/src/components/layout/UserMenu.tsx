import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (!user) {
    return null;
  }

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    setOpen(false);
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-none px-2 py-1 text-left transition-colors hover:bg-[#F5F5F5] focus:outline-none"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="hidden text-right sm:block">
          <span className="block text-sm font-medium leading-tight text-[#1A1A1A]">{user.name}</span>
          <span className="mt-0.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#FFE600] bg-[#1A1A1A] px-1.5 py-0.5 rounded">
            {user.role}
          </span>
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FFE600] text-xs font-semibold text-[#1A1A1A]">
          {initials}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[#525252]" />
      </button>

      {open ? (
        <div role="menu" className="absolute right-0 top-full z-20 mt-2 w-56 border border-[#E2E2E2] bg-white p-2 shadow-lg rounded-xl">
          <div className="border-b border-[#E2E2E2] px-3 py-2">
            <p className="text-sm font-bold text-[#1A1A1A]">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-[0.12em] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
              {user.role}
            </span>
          </div>

          <div className="py-1">
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#525252] hover:bg-[#F5F5F5]"
              onClick={() => setOpen(false)}
            >
              <UserIcon className="h-4 w-4 text-[#737373]" />
              Account Settings
            </button>
          </div>

          <div className="border-t border-[#E2E2E2] pt-1">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserMenu;