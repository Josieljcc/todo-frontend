import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { components } from '@/api';
import { Card } from '@/components/ui/card';
import { triggerTaskCompleteConfetti } from '@/lib/confetti';
import { cn } from '@/lib/utils';
import { TaskCardActions } from './TaskCardActions';
import { TaskCardContent } from './TaskCardContent';
import { TaskCardHeader } from './TaskCardHeader';

type Task = components['schemas']['models.Task'];

interface TaskCardProps {
  task: Task;
  onToggleComplete?: (task: Task, completed: boolean) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void;
  isLoading?: boolean;
}

export const TaskCard = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  isLoading = false,
}: TaskCardProps) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const isOverdue = !task.completed && new Date(task.due_date) < new Date();

  const handleCardClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  const handleToggleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newCompletedState = !task.completed;

    if (newCompletedState && !task.completed) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      triggerTaskCompleteConfetti(x, y);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }

    onToggleComplete?.(task, newCompletedState);
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-lg rounded-3xl flex flex-col',
        // Backgrounds sutis baseados no status
        task.completed &&
          'bg-green-50/50 dark:bg-green-950/20 border-2 border-green-500/30 opacity-60',
        !task.completed &&
          isOverdue &&
          'bg-red-50/50 dark:bg-red-950/20 border-2 border-red-500/30',
        !task.completed && !isOverdue && 'bg-card border'
      )}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <TaskCardHeader
        task={task}
        isAnimating={isAnimating}
        isLoading={isLoading}
        onToggleComplete={handleToggleComplete}
      />
      <TaskCardContent task={task} isOverdue={isOverdue} />
      <TaskCardActions
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleComplete={onToggleComplete}
        isLoading={isLoading}
      />
    </Card>
  );
};
