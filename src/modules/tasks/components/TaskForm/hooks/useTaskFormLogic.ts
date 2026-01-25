import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useUsers } from '@/modules/tasks/hooks/useUsers';
import {
  type CreateTaskFormData,
  createTaskSchema,
  type UpdateTaskFormData,
  updateTaskSchema,
} from '../../../schemas/taskSchemas';

interface UseTaskFormLogicProps {
  initialData?: UpdateTaskFormData;
  onSubmit: (data: CreateTaskFormData | UpdateTaskFormData) => void;
}

export const useTaskFormLogic = ({ initialData, onSubmit }: UseTaskFormLogicProps) => {
  const isEditMode = !!initialData;
  const schema = isEditMode ? updateTaskSchema : createTaskSchema;
  const { user: currentUser } = useAuth();
  const { users, isLoadingUsers } = useUsers({ limit: 100 });
  const [isForAnotherUser, setIsForAnotherUser] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateTaskFormData | UpdateTaskFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          ...initialData,
          due_date: initialData.due_date
            ? new Date(initialData.due_date).toISOString().slice(0, 16)
            : '',
        }
      : {
          title: '',
          description: '',
          type: 'casa',
          priority: 'media',
          due_date: '',
          tag_ids: [],
        },
  });

  const onSubmitForm = (data: CreateTaskFormData | UpdateTaskFormData) => {
    const formattedData = {
      ...data,
      due_date: new Date(data.due_date).toISOString(),
      user_id: isForAnotherUser ? data.user_id : undefined,
    };
    onSubmit(formattedData);
  };

  const selectedTagIds = watch('tag_ids') || [];
  const availableUsers = users.filter((u) => u.id !== currentUser?.id);

  const handleToggleUserAssignment = (checked: boolean) => {
    setIsForAnotherUser(checked);
    if (!checked) {
      setValue('user_id', undefined);
    }
  };

  return {
    isEditMode,
    register,
    handleSubmit: handleSubmit(onSubmitForm),
    errors,
    selectedTagIds,
    setValue,
    isForAnotherUser,
    availableUsers,
    isLoadingUsers,
    handleToggleUserAssignment,
  };
};
