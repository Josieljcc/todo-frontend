import type * as React from 'react';
import { cn } from '@/lib/utils';

interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GradientBackground = ({ children, className, ...props }: GradientBackgroundProps) => {
  return (
    <div className={cn('min-h-screen', className)} {...props}>
      {children}
    </div>
  );
};
