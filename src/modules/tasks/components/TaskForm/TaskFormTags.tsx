import { Label } from '@/components/ui/label';
import { useTags } from '../../hooks/useTags';
import { TagSelector } from '../TagSelector';

interface TaskFormTagsProps {
  selectedTagIds: number[];
  onSelectionChange: (tagIds: number[]) => void;
  isLoading: boolean;
}

export const TaskFormTags = ({
  selectedTagIds,
  onSelectionChange,
  isLoading,
}: TaskFormTagsProps) => {
  const { tags, isLoadingTags } = useTags();

  return (
    <div className="space-y-2">
      <Label>Tags</Label>
      {isLoadingTags ? (
        <div className="text-sm text-muted-foreground">Carregando tags...</div>
      ) : (
        <TagSelector
          tags={tags}
          selectedTagIds={selectedTagIds}
          onSelectionChange={onSelectionChange}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
