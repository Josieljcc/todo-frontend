import { motion } from 'framer-motion';
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

  const MotionSpan = motion.span;

  if (variant === 'outline') {
    return (
      <MotionSpan
        className={cn(
          'inline-flex items-center gap-1 rounded-md border font-medium',
          sizeClasses[size],
          className
        )}
        style={{
          borderColor: `${tag.color}40`,
          color: tag.color,
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        {tag.name}
        {onRemove && (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(tag.id);
            }}
            className="hover:opacity-70"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-3 w-3" />
          </motion.button>
        )}
      </MotionSpan>
    );
  }

  return (
    <MotionSpan
      className={cn(
        'inline-flex items-center gap-1 rounded-md font-medium',
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: `${tag.color}20`,
        color: tag.color,
        border: `1px solid ${tag.color}40`,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      {tag.name}
      {onRemove && (
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tag.id);
          }}
          className="hover:opacity-70"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-3 w-3" />
        </motion.button>
      )}
    </MotionSpan>
  );
};
