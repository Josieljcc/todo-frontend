import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Tag,
  User,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { Loading } from '@/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CommentForm, CommentList } from '../components';
import { useComments } from '../hooks/useComments';
import { useTask } from '../hooks/useTask';
import { useTasks } from '../hooks/useTasks';

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

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskId = id ? parseInt(id, 10) : 0;

  const { data: task, isLoading, error } = useTask(taskId);
  const {
    toggleTaskCompletion,
    isTogglingCompletion,
    deleteTask,
    isDeletingTask,
  } = useTasks();

  const {
    comments,
    isLoadingComments,
    createComment,
    updateComment,
    deleteComment,
    isCreatingComment,
    isUpdatingComment,
    isDeletingComment,
  } = useComments(taskId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleToggleComplete = () => {
    if (task) {
      toggleTaskCompletion(task, !task.completed);
    }
  };

  const handleDelete = () => {
    if (task && window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      deleteTask(task.id, {
        onSuccess: () => {
          navigate('/tasks');
        },
      });
    }
  };

  const handleCreateComment = (content: string) => {
    if (!task) return;
    createComment(
      { content, task_id: task.id },
      {
        onSuccess: () => {
          // Comment list will auto-refresh via query invalidation
        },
      },
    );
  };

  const handleEditComment = (id: number, content: string) => {
    updateComment({ id, data: { content } });
  };

  const handleDeleteComment = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
      deleteComment(id);
    }
  };

  const isEditingComment = (_id: number) => isUpdatingComment;
  const isDeletingCommentById = (_id: number) => isDeletingComment;

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center py-12">
          <Loading />
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center py-12">
          <p className="text-destructive">Erro ao carregar a tarefa</p>
          <Button
            variant="outline"
            onClick={() => navigate('/tasks')}
            className="mt-4"
          >
            Voltar para tarefas
          </Button>
        </div>
      </div>
    );
  }

  const isOverdue = !task.completed && new Date(task.due_date) < new Date();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/tasks')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Detalhes da Tarefa</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle
                className={cn(
                  'text-2xl',
                  task.completed && 'line-through opacity-60',
                )}
              >
                {task.title}
              </CardTitle>
            </div>
            <button
              type="button"
              onClick={handleToggleComplete}
              disabled={isTogglingCompletion}
              className="shrink-0"
              aria-label={
                task.completed ? 'Mark as incomplete' : 'Mark as complete'
              }
            >
              {task.completed ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : (
                <Circle className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-2">Descrição</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {task.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data de Vencimento
              </h3>
              <p
                className={cn(
                  'text-muted-foreground',
                  isOverdue && 'text-red-600 font-medium',
                )}
              >
                {formatDate(task.due_date)}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Tipo</h3>
              <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium">
                {typeLabels[task.type]}
              </span>
            </div>

            {task.priority && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Prioridade</h3>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm font-medium capitalize',
                    priorityColors[task.priority],
                  )}
                >
                  {task.priority}
                </span>
              </div>
            )}

            {task.assigned_by_user && (
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Atribuído por
                </h3>
                <p className="text-muted-foreground">
                  {task.assigned_by_user.username}
                </p>
              </div>
            )}
          </div>

          {task.tags && task.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium"
                    style={{
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                      border: `1px solid ${tag.color}40`,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => navigate(`/tasks?edit=${task.id}`)}
              className="flex-1"
            >
              Editar Tarefa
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeletingTask}
              className="flex-1"
            >
              {isDeletingTask ? 'Excluindo...' : 'Excluir Tarefa'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comentários ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CommentForm
            taskId={task.id}
            onSubmit={handleCreateComment}
            isLoading={isCreatingComment}
          />
          <CommentList
            comments={comments}
            isLoading={isLoadingComments}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
            isEditing={isEditingComment}
            isDeleting={isDeletingCommentById}
          />
        </CardContent>
      </Card>
    </div>
  );
};
