import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { ProtectedRoute } from '@/app/routes/ProtectedRoute';
import { RouteLoader } from '@/shared/ui/skeleton';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';

// ── Public pages (viewer + admin) ──────────────────────────────
const HomePage     = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// ── Admin-only pages (requires login) ─────────────────────────
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

// ── Auth pages ────────────────────────────────────────────────
// Only /auth/login — no register (admin accounts created in Firebase Console)
const LoginPage = lazy(() => import('@/pages/LoginPage'));

/** Wrap lazy page with Suspense + per-page ErrorBoundary */
function LazyPage({
  Component,
}: {
  Component: React.LazyExoticComponent<() => React.JSX.Element>;
}) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoader />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}

export const router = createBrowserRouter([
  // ── Public routes (everyone can access) ─────────────────────
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LazyPage Component={HomePage} />,
      },
      // ── Admin-only routes (login required) ────────────────
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <LazyPage Component={DashboardPage} />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ── Auth routes (admin login) ────────────────────────────────
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LazyPage Component={LoginPage} /> },
      // No register route — admin accounts managed in Firebase Console
      { index: true, element: <Navigate to="login" replace /> },
    ],
  },

  // ── Fallback ─────────────────────────────────────────────────
  {
    path: '*',
    element: <LazyPage Component={NotFoundPage} />,
  },
]);
