import { Outlet } from 'react-router-dom';

/**
 * Layout for authentication pages (login, register).
 * Centered card with background.
 */
export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Vote</h1>
          <p className="mt-2 text-muted-foreground">
            Nền tảng bình chọn trực tuyến
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
