import * as React from 'react';
import type { components } from '@/api';

type Task = components['schemas']['models.Task'];

interface TaskFormContextType {
  isOpen: boolean;
  editingTask: Task | null;
  openForm: (task?: Task) => void;
  closeForm: () => void;
}

const TaskFormContext = React.createContext<TaskFormContextType | undefined>(undefined);

export const useTaskForm = () => {
  const context = React.useContext(TaskFormContext);
  if (!context) {
    throw new Error('useTaskForm must be used within TaskFormProvider');
  }
  return context;
};

interface TaskFormProviderProps {
  children: React.ReactNode;
}

export const TaskFormProvider = ({ children }: TaskFormProviderProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);

  const openForm = React.useCallback((task?: Task) => {
    setEditingTask(task || null);
    setIsOpen(true);
  }, []);

  const closeForm = React.useCallback(() => {
    setIsOpen(false);
    setEditingTask(null);
  }, []);

  const value = React.useMemo(
    () => ({
      isOpen,
      editingTask,
      openForm,
      closeForm,
    }),
    [isOpen, editingTask, openForm, closeForm]
  );

  return <TaskFormContext.Provider value={value}>{children}</TaskFormContext.Provider>;
};
