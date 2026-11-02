import type { BaseEntity } from '@/shared/types';

export interface UserProfile extends BaseEntity {
  email: string;
  displayName: string;
  photoURL: string | null;
  role: 'user' | 'admin';
}
