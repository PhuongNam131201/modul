import { useState, useEffect } from 'react';
import { ref, onValue, type DatabaseReference } from 'firebase/database';
import { db } from '@/shared/api/firebase';

interface UseRealtimeValueResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Generic hook to listen to a Firebase Realtime Database path.
 * Automatically subscribes/unsubscribes on mount/unmount.
 *
 * @param path - Database path to listen to (e.g., 'posts', 'users/abc123')
 * @param transform - Optional function to transform raw snapshot data
 */
export function useRealtimeValue<T>(
  path: string | null,
  transform?: (data: unknown) => T
): UseRealtimeValueResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!db || !path) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const dbRef: DatabaseReference = ref(db, path);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const rawData = snapshot.val();
        if (rawData !== null && transform) {
          setData(transform(rawData));
        } else {
          setData(rawData as T);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path, transform]);

  return { data, loading, error };
}
