/**
 * Common shared types used across the application.
 */

/** Base entity with common fields */
export interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt?: number;
}

/** API response wrapper */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/** Pagination params */
export interface PaginationParams {
  page: number;
  limit: number;
}

/** Generic record from Firebase RTDB (key-value map) */
export type FirebaseRecord<T> = Record<string, T>;

/** Children props shorthand */
export interface ChildrenProps {
  children: React.ReactNode;
}
