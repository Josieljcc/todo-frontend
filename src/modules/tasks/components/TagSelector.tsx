import type { components } from '@/api';
import { TagBadge } from './TagBadge';
import { cn } from '@/lib/utils';

type Tag = components['schemas']['models.Tag'];

interface TagSelectorProps {
  tags: Tag[];
  selectedTagIds: number[];
  onSelectionChange: (tagIds: number[]) => void;
  isLoading?: boolean;
}

export const TagSelector = ({
  tags,
  selectedTagIds,
  onSelectionChange,
  isLoading = false,
}: TagSelectorProps) => {
  const handleTagToggle = (tagId: number) => {
    if (selectedTagIds.includes(tagId)) {
      onSelectionChange(selectedTagIds.filter((id) => id !== tagId));
    } else {
      onSelectionChange([...selectedTagIds, tagId]);
    }
  };

  if (tags.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        Nenhuma tag disponível. Crie tags para organizar suas tarefas.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTagIds.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => handleTagToggle(tag.id)}
            disabled={isLoading}
            className={cn(
              'transition-all',
              isSelected && 'ring-2 ring-primary ring-offset-2',
            )}
          >
            <TagBadge
              tag={tag}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
            />
          </button>
        );
      })}
    </div>
  );
};
