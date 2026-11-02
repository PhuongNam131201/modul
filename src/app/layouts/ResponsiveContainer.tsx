import { cn } from '@/shared/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * A responsive container that adapts width to different screen sizes.
 * Max-width contained on large screens, full-width on mobile.
 */
export function ResponsiveContainer({
  children,
  className,
  as: Component = 'div',
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        'max-w-7xl',
        className
      )}
    >
      {children}
    </Component>
  );
}
