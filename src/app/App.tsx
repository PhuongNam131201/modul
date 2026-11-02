import { RouterProvider } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { router } from '@/app/routes';

/**
 * Root application component.
 * Layer order (outermost → innermost):
 *   ErrorBoundary → Providers → Router
 */
export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  );
}
