import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/app/providers/AuthProvider';

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSignUp: (email: string, password: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
}

/**
 * Hook wrapping auth operations with loading/error state management.
 */
export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signIn(email, password);
      navigate('/dashboard'); // Admin goes directly to dashboard after login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signUp(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng xuất thất bại');
    }
  };

  return { loading, error, handleSignIn, handleSignUp, handleSignOut };
}
