import { NavLink, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Moon, Sun, type LucideIcon } from 'lucide-react';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { useTheme } from '@/app/providers/ThemeProvider';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

export interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  /** If true, only show this nav item when admin is logged in */
  adminOnly?: boolean;
}

interface SidebarNavProps {
  items: NavItem[];
  onNavClick?: () => void;
  /** 'vertical' = sidebar links, 'horizontal' = bottom bar tabs */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Shared nav component used by:
 * - Desktop sidebar (vertical)
 * - Mobile slide-over sidebar (vertical)
 * - Mobile bottom navigation bar (horizontal)
 *
 * Access model:
 *  - Viewer : sees public nav items + "Đăng nhập" button
 *  - Admin  : sees all nav items (incl. adminOnly) + "Đăng xuất" button
 */
export function SidebarNav({ items, onNavClick, orientation = 'vertical' }: SidebarNavProps) {
  const { user, signOut } = useAuthContext();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const isAdmin = user !== null;

  const visibleItems = items.filter((item) => !item.adminOnly || isAdmin);

  if (orientation === 'horizontal') {
    return (
      <nav className="flex h-full items-center justify-around">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavClick}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors min-w-[64px]',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}

        {/* Show logout in bottom nav ONLY when logged in as admin */}
        {isAdmin && (
          <button
            onClick={signOut}
            className="flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors min-w-[64px] text-destructive"
          >
            <LogOut className="h-5 w-5" />
            Thoát
          </button>
        )}
      </nav>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <nav className="flex-1 space-y-1">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 border-t pt-4">
        {/* Dark/Light mode toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </Button>

        {/* Admin: show logout button only when logged in */}
        {isAdmin && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </Button>
        )}
      </div>
    </div>
  );
}
