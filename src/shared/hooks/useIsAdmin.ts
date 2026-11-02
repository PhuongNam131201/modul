import { useAuthContext } from '@/app/providers';

/**
 * Returns true when a Firebase user is logged in (= admin).
 * Viewers are unauthenticated — no login required.
 *
 * Usage:
 *   const isAdmin = useIsAdmin();
 *   {isAdmin && <button>Xoá</button>}
 *   {isAdmin && <button>Chỉnh sửa</button>}
 */
export function useIsAdmin(): boolean {
  const { user } = useAuthContext();
  return user !== null;
}
