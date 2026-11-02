import { cn } from '@/shared/lib/utils';
import { User } from 'lucide-react';
import { getOptimizedUrl } from '@/shared/api/cloudinary';

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
};

export function UserAvatar({ src, alt = 'User', size = 'md', className }: UserAvatarProps) {
  const optimizedSrc = src
    ? getOptimizedUrl(src, { width: 112, height: 112, crop: 'thumb' })
    : null;

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-full bg-muted',
        sizeClasses[size],
        className
      )}
    >
      {optimizedSrc ? (
        <img
          src={optimizedSrc}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <User className="h-1/2 w-1/2 text-muted-foreground" />
      )}
    </div>
  );
}
