import { Calendar, CheckCircle2, Circle, Tag, User } from 'lucide-react';
import type { components } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Task = components['schemas']['models.Task'];

interface TaskCardProps {
  task: Task;
  onToggleComplete?: (task: Task, completed: boolean) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void;
  isLoading?: boolean;
}

const priorityColors = {
  baixa: 'bg-blue-100 text-blue-800 border-blue-200',
  media: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  alta: 'bg-orange-100 text-orange-800 border-orange-200',
  urgente: 'bg-red-100 text-red-800 border-red-200',
};

const typeLabels = {
  casa: 'Casa',
  trabalho: 'Trabalho',
  lazer: 'Lazer',
  saude: 'Saúde',
};

export const TaskCard = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  isLoading = false,
}: TaskCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const isOverdue = !task.completed && new Date(task.due_date) < new Date();

  return (
    <Card
      className={cn(
        'transition-all hover:shadow-md',
        task.completed && 'opacity-60',
        isOverdue && !task.completed && 'border-red-300',
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle
            className={cn(
              'text-lg font-semibold',
              task.completed && 'line-through',
            )}
          >
            {task.title}
          </CardTitle>
          <button
            type="button"
            onClick={() => onToggleComplete?.(task, !task.completed)}
            disabled={isLoading}
            className="mt-1 flex-shrink-0"
            aria-label={
              task.completed ? 'Mark as incomplete' : 'Mark as complete'
            }
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p
          className="text-sm text-muted-foreground overflow-hidden text-ellipsis"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {task.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
            {typeLabels[task.type]}
          </span>

          {task.priority && (
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium capitalize',
                priorityColors[task.priority],
              )}
            >
              {task.priority}
            </span>
          )}

          {task.tags && task.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              <span className="text-xs text-muted-foreground">
                {task.tags.length} tag{task.tags.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span
              className={cn(
                isOverdue && !task.completed && 'text-red-600 font-medium',
              )}
            >
              {formatDate(task.due_date)}
            </span>
          </div>

          {task.assigned_by_user && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{task.assigned_by_user.username}</span>
            </div>
          )}
        </div>

        {(onEdit || onDelete) && (
          <div className="flex gap-2 pt-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(task)}
                disabled={isLoading}
                className="flex-1"
              >
                Editar
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(task.id)}
                disabled={isLoading}
                className="flex-1"
              >
                Excluir
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
