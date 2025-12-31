import { Edit2, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import type { components } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { CommentForm } from './CommentForm';

type Comment = components['schemas']['models.Comment'];

interface CommentCardProps {
  comment: Comment;
  onEdit?: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
  isEditing?: boolean;
  isLoading?: boolean;
}

export const CommentCard = ({
  comment,
  onEdit,
  onDelete,
  isEditing: isEditingProp,
  isLoading = false,
}: CommentCardProps) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(isEditingProp || false);

  const isOwner = user?.id === comment.user_id;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEdit = (content: string) => {
    onEdit?.(comment.id, content);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <CommentForm
        initialContent={comment.content}
        onSubmit={handleEdit}
        onCancel={handleCancel}
        isLoading={isLoading}
        submitLabel="Salvar"
      />
    );
  }

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {comment.user?.username || 'Usuário'}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDate(comment.created_at)}
              </span>
            </div>
            {isOwner && (onEdit || onDelete) && (
              <div className="flex gap-1">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setIsEditing(true)}
                    disabled={isLoading}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => onDelete(comment.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
          </div>
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
