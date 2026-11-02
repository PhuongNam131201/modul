import { useRealtimeValue } from '@/shared/hooks/useRealtimeValue';
import type { UserProfile } from './types';

/**
 * Hook to get realtime user profile data from Firebase RTDB.
 */
export function useUser(uid: string | null) {
  return useRealtimeValue<UserProfile>(
    uid ? `users/${uid}` : null
  );
}
