import type { components } from '@/api';
import { Loading } from '@/components';
import { CommentCard } from './CommentCard';

type Comment = components['schemas']['models.Comment'];

interface CommentListProps {
  comments: Comment[];
  isLoading?: boolean;
  onEdit?: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
  isEditing?: (id: number) => boolean;
  isDeleting?: (id: number) => boolean;
}

export const CommentList = ({
  comments,
  isLoading = false,
  onEdit,
  onDelete,
  isEditing,
  isDeleting,
}: CommentListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loading />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          isEditing={isEditing?.(comment.id)}
          isLoading={isDeleting?.(comment.id)}
        />
      ))}
    </div>
  );
};
