import { Outlet, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, X, Menu, LogIn, LogOut } from 'lucide-react';
import { useIsMobile } from '@/shared/hooks/useMediaQuery';
import { useAppStore } from '@/stores/appStore';
import { usePrefetchCriticalRoutes } from '@/shared/hooks/usePrefetch';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { SidebarNav, type NavItem } from '@/shared/ui/SidebarNav';
import { ResponsiveContainer } from './ResponsiveContainer';

const NAV_ITEMS: NavItem[] = [
  { to: '/', icon: Home, label: 'Trang chủ' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', adminOnly: true },
];

const BRAND = 'Vote';

/**
 * Root layout with:
 * - Desktop: persistent left sidebar
 * - Mobile:  top header + slide-over sidebar + bottom nav bar
 *
 * Nav logic is extracted into <SidebarNav> — add/remove nav items
 * by editing NAV_ITEMS above only.
 */
export function RootLayout() {
  const isMobile = useIsMobile();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();
  const isAdmin = user !== null;

  // Prefetch critical routes when browser is idle — reduces click lag
  usePrefetchCriticalRoutes();

  return (
    <div className="flex min-h-screen bg-background">
      {/* ── Desktop Sidebar ─────────────────────────────── */}
      {!isMobile && (
        <aside className="sticky top-0 flex h-screen w-64 flex-col border-r bg-card p-4">
          <p className="mb-8 text-xl font-bold text-foreground">{BRAND}</p>
          <SidebarNav items={NAV_ITEMS} />
        </aside>
      )}

      {/* ── Mobile Sidebar Overlay ──────────────────────── */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside
            className={cn(
              'relative z-50 flex h-full w-64 flex-col bg-card p-4 shadow-2xl',
              'animate-slide-in-right'
            )}
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="text-xl font-bold text-foreground">{BRAND}</p>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <SidebarNav items={NAV_ITEMS} onNavClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile Header */}
        {isMobile && (
          <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-card/95 backdrop-blur px-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle menu">
                <Menu className="h-5 w-5" />
              </Button>
              <p className="text-lg font-bold text-foreground">{BRAND}</p>
            </div>
            {/* Admin logout only - Hide all login hints from normal users */}
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs text-destructive hover:text-destructive"
                onClick={signOut}
              >
                <LogOut className="h-3.5 w-3.5" />
                Thoát
              </Button>
            )}
          </header>
        )}

        {/* Page outlet */}
        <main className="flex-1">
          <ResponsiveContainer className="py-6">
            <Outlet />
          </ResponsiveContainer>
        </main>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <footer className="sticky bottom-0 z-40 h-16 border-t bg-card/95 backdrop-blur">
            <SidebarNav items={NAV_ITEMS} orientation="horizontal" />
          </footer>
        )}
      </div>
    </div>
  );
}
