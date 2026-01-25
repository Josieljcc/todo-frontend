import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Circle, Edit2, MessageSquare, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { components } from '@/api';
import { ConfirmDialog } from '@/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type Task = components['schemas']['models.Task'];

interface TaskCardActionsProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void;
  onToggleComplete?: (task: Task, completed: boolean) => void;
  isLoading: boolean;
}

export const TaskCardActions = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  isLoading,
}: TaskCardActionsProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const hasActions = onEdit || onDelete || onToggleComplete;

  if (!hasActions) {
    return null;
  }

  const handleEdit = () => {
    onEdit?.(task);
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
    setIsOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDelete?.(task.id);
    setShowDeleteConfirm(false);
  };

  const handleToggleComplete = () => {
    onToggleComplete?.(task, !task.completed);
    setIsOpen(false);
  };

  const handleComment = () => {
    navigate(`/tasks/${task.id}`);
    setIsOpen(false);
  };

  return (
    <>
      {/* Dialog de confirmação de exclusão */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Tarefa"
        description={`Tem certeza que deseja excluir a tarefa "${task.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
        isLoading={isLoading}
      />

      {/* Backdrop com blur quando menu está aberto */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-end px-6 py-2.5 flex-shrink-0 border-t border-border/30">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                'h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center justify-center',
                isOpen && 'bg-accent text-foreground'
              )}
              aria-label="Menu de opções"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 rounded-2xl border-2 bg-card/95 backdrop-blur-md shadow-xl z-[101]"
            onClick={(e) => e.stopPropagation()}
          >
            {onToggleComplete && (
              <DropdownMenuItem
                onClick={handleToggleComplete}
                disabled={isLoading}
                className="rounded-xl cursor-pointer"
              >
                {task.completed ? (
                  <>
                    <Circle className="mr-2 h-4 w-4" />
                    Marcar como pendente
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Marcar como concluída
                  </>
                )}
              </DropdownMenuItem>
            )}
            {onToggleComplete && (onEdit || onDelete) && <DropdownMenuSeparator />}
            {onEdit && (
              <DropdownMenuItem
                onClick={handleEdit}
                disabled={isLoading}
                className="rounded-xl cursor-pointer"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleComment} className="rounded-xl cursor-pointer">
              <MessageSquare className="mr-2 h-4 w-4" />
              Comentar
            </DropdownMenuItem>
            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  disabled={isLoading}
                  className="rounded-xl cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
