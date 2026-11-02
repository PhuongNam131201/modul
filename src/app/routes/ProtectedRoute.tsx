import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { PageLoader } from '@/shared/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Where to redirect when not authenticated. Default: / (homepage) */
  redirectTo?: string;
}

/**
 * Admin-only route guard.
 *
 * Access model:
 *  - Viewer (public) : no login needed, sees public pages
 *  - Admin           : must login via /auth/login to access protected routes
 *
 * States:
 *  loading → spinner (auth state not yet resolved from Firebase)
 *  no user → redirect to homepage (viewer doesn't see login page)
 *  user ok → render children
 */
export function ProtectedRoute({
  children,
  redirectTo = '/',
}: ProtectedRouteProps) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <PageLoader message="Đang kiểm tra quyền..." />;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
