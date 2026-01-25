import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommentForm, CommentList } from '../../components';

interface TaskDetailCommentsProps {
  taskId: number;
  commentsCount: number;
  onCreateComment: (content: string) => void;
  onEditComment: (id: number, content: string) => void;
  onDeleteComment: (id: number) => void;
  isLoadingComments: boolean;
  isCreatingComment: boolean;
  isEditingComment: (id: number) => boolean;
  isDeletingCommentById: (id: number) => boolean;
  comments: Array<{
    id: number;
    content: string;
    created_at: string;
    user: {
      id: number;
      username: string;
    };
  }>;
}

export const TaskDetailComments = ({
  taskId,
  commentsCount,
  onCreateComment,
  onEditComment,
  onDeleteComment,
  isLoadingComments,
  isCreatingComment,
  isEditingComment,
  isDeletingCommentById,
  comments,
}: TaskDetailCommentsProps) => {
  return (
    <Card className="rounded-3xl flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Comentários ({commentsCount})</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6 pt-0">
        <div className="flex-shrink-0">
          <CommentForm taskId={taskId} onSubmit={onCreateComment} isLoading={isCreatingComment} />
        </div>
        <div className="flex-1 min-h-0">
          <CommentList
            comments={comments}
            isLoading={isLoadingComments}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
            isEditing={isEditingComment}
            isDeleting={isDeletingCommentById}
          />
        </div>
      </CardContent>
    </Card>
  );
};
