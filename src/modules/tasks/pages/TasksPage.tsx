import { Plus } from 'lucide-react';
import { useState } from 'react';
import type { components } from '@/api';
import { Loading } from '@/components';
import { Button } from '@/components/ui/button';
import { TaskCard, TaskFilters, TaskForm } from '../components';
import { useTasks } from '../hooks/useTasks';
import type {
  CreateTaskFormData,
  TaskFilters as TaskFiltersType,
  UpdateTaskFormData,
} from '../schemas/taskSchemas';

type Task = components['schemas']['models.Task'];

export const TasksPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFiltersType>({
    order: 'desc',
  });
  const [page, setPage] = useState(1);

  const {
    tasks,
    pagination,
    isLoadingTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    isCreatingTask,
    isUpdatingTask,
    isDeletingTask,
    isTogglingCompletion,
  } = useTasks({
    ...filters,
    page,
    limit: 10,
  });

  const handleCreateTask = (data: CreateTaskFormData) => {
    createTask(data, {
      onSuccess: () => {
        setShowTaskForm(false);
      },
    });
  };

  const handleUpdateTask = (data: UpdateTaskFormData) => {
    if (!editingTask) return;
    updateTask(
      {
        id: editingTask.id,
        data,
      },
      {
        onSuccess: () => {
          setEditingTask(null);
        },
      },
    );
  };

  const handleDeleteTask = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      deleteTask(id);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCancelForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleResetFilters = () => {
    setFilters({ order: 'desc' });
    setPage(1);
  };

  const isLoading =
    isLoadingTasks ||
    isCreatingTask ||
    isUpdatingTask ||
    isDeletingTask ||
    isTogglingCompletion;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Minhas Tarefas</h1>
          <p className="text-muted-foreground">
            Gerencie suas tarefas e mantenha-se organizado
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTask(null);
            setShowTaskForm(true);
          }}
          disabled={isLoading}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      <TaskFilters
        filters={filters}
        onFiltersChange={setFilters}
        onReset={handleResetFilters}
      />

      {showTaskForm && (
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCancelForm}
          initialData={
            editingTask
              ? {
                  title: editingTask.title,
                  description: editingTask.description,
                  type: editingTask.type,
                  priority: editingTask.priority,
                  due_date: editingTask.due_date,
                  completed: editingTask.completed,
                  tag_ids: editingTask.tags?.map((tag) => tag.id) ?? [],
                }
              : undefined
          }
          isLoading={isCreatingTask || isUpdatingTask}
          submitLabel={editingTask ? 'Salvar Alterações' : 'Criar Tarefa'}
        />
      )}

      {isLoadingTasks ? (
        <div className="flex justify-center py-12">
          <Loading />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhuma tarefa encontrada. Crie sua primeira tarefa!
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskCompletion}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                isLoading={isLoading}
              />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
              >
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {pagination.page} de {pagination.totalPages} (
                {pagination.total} tarefas)
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={page === pagination.totalPages || isLoading}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
