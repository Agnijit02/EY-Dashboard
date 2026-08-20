import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { navigationItems } from '../../routes/routeConfig';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../utils/cn';

function Sidebar() {
  const { user } = useAuth();
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  const visibleRoutes = navigationItems.filter((item) => user && item.roles.includes(user.role));

  const groups = [
    {
      title: 'Overview',
      items: visibleRoutes.filter((item) => ['Dashboard', 'Analytics'].includes(item.label)),
    },
    {
      title: 'Delivery',
      items: visibleRoutes.filter((item) => ['Projects', 'Clients', 'Resources'].includes(item.label)),
    },
    {
      title: 'Governance',
      items: visibleRoutes.filter((item) => ['Risks', 'Reports'].includes(item.label)),
    },
  ];

  const initials = user?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? 'U';

  return (
    <aside
      className={cn(
        'relative hidden h-screen shrink-0 flex-col transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] lg:flex',
        sidebarCollapsed ? 'w-[78px]' : 'w-[264px]',
      )}
      style={{
        background: 'linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 40%, #1f1f1f 100%)',
      }}
    >
      {/* Ambient glow at top */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#FFE600]/[0.04] blur-[60px]" />

      {/* Logo */}
      <div className="relative border-b border-white/[0.06] px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="animate-pulse-glow flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE600] text-sm font-black tracking-tight text-[#1A1A1A] shadow-[0_0_20px_rgba(255,230,0,0.2)]">
            EY
          </div>

          {!sidebarCollapsed ? (
            <div className="overflow-hidden">
              <p className="text-[13px] font-semibold tracking-wide text-white">Enterprise</p>
              <p className="text-[11px] font-medium text-white/40">Intelligence Platform</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-5">
          {groups.map(
            (group) =>
              group.items.length ? (
                <div key={group.title} className="space-y-1">
                  {!sidebarCollapsed ? (
                    <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{group.title}</p>
                  ) : null}

                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          title={sidebarCollapsed ? item.label : undefined}
                          className={({ isActive }) =>
                            cn(
                              'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200',
                              isActive
                                ? 'bg-white/[0.08] text-[#FFE600] shadow-[inset_0_0_0_1px_rgba(255,230,0,0.12),0_0_20px_rgba(255,230,0,0.06)]'
                                : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80',
                              sidebarCollapsed && 'justify-center px-2',
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              {isActive && (
                                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#FFE600] shadow-[0_0_8px_rgba(255,230,0,0.4)]" />
                              )}
                              <Icon className={cn('h-[18px] w-[18px] shrink-0 transition-colors', isActive && 'drop-shadow-[0_0_6px_rgba(255,230,0,0.3)]')} />
                              {!sidebarCollapsed ? <span>{item.label}</span> : null}
                            </>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ) : null,
          )}
        </div>
      </nav>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#1A1A1A] text-white/60 shadow-lg transition-all duration-200 hover:border-[#FFE600]/30 hover:bg-[#252525] hover:text-[#FFE600]"
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* User section */}
      <div className="relative border-t border-white/[0.06] px-3 py-4">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFE600] text-[11px] font-black text-[#1A1A1A]">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">{user?.name ?? 'User'}</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FFE600]/60">{user?.role ?? 'Guest'}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFE600] text-[11px] font-black text-[#1A1A1A]">
              {initials}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;