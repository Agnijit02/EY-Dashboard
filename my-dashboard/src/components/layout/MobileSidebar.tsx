import { X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../routes/routeConfig';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../utils/cn';

function MobileSidebar() {
  const mobileSidebarOpen = useUIStore((state) => state.mobileSidebarOpen);
  const setMobileSidebarOpen = useUIStore((state) => state.setMobileSidebarOpen);

  if (!mobileSidebarOpen) {
    return null;
  }

  const groups = [
    {
      title: 'Overview',
      items: navigationItems.filter((item) => ['Dashboard', 'Analytics'].includes(item.label)),
    },
    {
      title: 'Delivery',
      items: navigationItems.filter((item) => ['Projects', 'Clients', 'Resources'].includes(item.label)),
    },
    {
      title: 'Governance',
      items: navigationItems.filter((item) => ['Risks', 'Reports'].includes(item.label)),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        className="absolute inset-0 bg-black/50"
        onClick={() => setMobileSidebarOpen(false)}
      />

      <aside className="relative flex h-full w-72 flex-col bg-[#1A1A1A] text-white">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-[#FFE600] text-sm font-black text-[#1A1A1A]">EY</div>
            <div>
              <p className="text-sm font-semibold text-white">Enterprise</p>
              <p className="text-xs text-white/50">Intelligence Platform</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="p-2 text-white/70 hover:bg-white/5 hover:text-white"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-6">
            {groups.map(
              (group) =>
                group.items.length ? (
                  <div key={group.title} className="space-y-2">
                    <p className="px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">{group.title}</p>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;

                        return (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileSidebarOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                'flex items-center gap-3 border-l-4 px-4 py-2.5 text-sm transition-colors',
                                isActive
                                  ? 'border-[#FFE600] bg-white/10 text-[#FFE600]'
                                  : 'border-transparent text-white/60 hover:bg-white/5 hover:text-white',
                              )
                            }
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                ) : null,
            )}
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default MobileSidebar;