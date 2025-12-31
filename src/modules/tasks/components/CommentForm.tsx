import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  type CreateCommentFormData,
  createCommentSchema,
  type UpdateCommentFormData,
  updateCommentSchema,
} from '../schemas/commentSchemas';

interface CommentFormProps {
  taskId?: number;
  initialContent?: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export const CommentForm = ({
  taskId,
  initialContent,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Comentar',
}: CommentFormProps) => {
  const isEditMode = !!initialContent;
  const schema = isEditMode ? updateCommentSchema : createCommentSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentFormData | UpdateCommentFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialContent
      ? { content: initialContent }
      : { content: '', task_id: taskId },
  });

  const onSubmitForm = (
    data: CreateCommentFormData | UpdateCommentFormData,
  ) => {
    onSubmit(data.content);
    if (!isEditMode) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-2">
      <div className="space-y-1">
        <Input
          placeholder="Escreva um comentário..."
          {...register('content')}
          aria-invalid={errors.content ? 'true' : 'false'}
          disabled={isLoading}
        />
        {errors.content && (
          <p className="text-xs text-destructive" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        )}
        <Button type="submit" size="sm" disabled={isLoading}>
          <Send className="mr-2 h-3 w-3" />
          {isLoading ? 'Salvando...' : submitLabel}
        </Button>
      </div>
    </form>
  );
};
