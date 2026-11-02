import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Compose all application providers.
 * Order: ThemeProvider (outermost) → AuthProvider → children
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}

// Re-export hooks for convenience — consumers import from one place
export { useTheme } from './ThemeProvider';
export { useAuthContext } from './AuthProvider';
