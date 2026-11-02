import { useEffect } from 'react';

/**
 * Prefetch lazy-loaded routes on mouse hover / touch.
 * Call this in nav components to preload the chunk BEFORE user clicks.
 *
 * Usage:
 *   const prefetch = usePrefetch();
 *   <a onMouseEnter={() => prefetch(() => import('@/pages/DashboardPage'))} />
 */
export function usePrefetch() {
  return (importFn: () => Promise<unknown>) => {
    importFn().catch(() => {
      // Silently fail — prefetch is best-effort
    });
  };
}

/**
 * Eagerly prefetch critical routes after the app loads.
 * Call once in App or RootLayout.
 */
export function usePrefetchCriticalRoutes() {
  useEffect(() => {
    // Prefetch after browser is idle — doesn't block initial render
    const id = requestIdleCallback(
      () => {
        void import('@/pages/DashboardPage');
        void import('@/pages/LoginPage');
      },
      { timeout: 3000 }
    );

    return () => cancelIdleCallback(id);
  }, []);
}
