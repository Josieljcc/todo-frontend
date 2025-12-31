import { X } from 'lucide-react';
import type { components } from '@/api';
import { cn } from '@/lib/utils';

type Tag = components['schemas']['models.Tag'];

interface TagBadgeProps {
  tag: Tag;
  onRemove?: (id: number) => void;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const TagBadge = ({
  tag,
  onRemove,
  variant = 'default',
  size = 'md',
  className,
}: TagBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  if (variant === 'outline') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-md border font-medium',
          sizeClasses[size],
          className,
        )}
        style={{
          borderColor: `${tag.color}40`,
          color: tag.color,
        }}
      >
        {tag.name}
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(tag.id);
            }}
            className="hover:opacity-70"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md font-medium',
        sizeClasses[size],
        className,
      )}
      style={{
        backgroundColor: `${tag.color}20`,
        color: tag.color,
        border: `1px solid ${tag.color}40`,
      }}
    >
      {tag.name}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tag.id);
          }}
          className="hover:opacity-70"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};
