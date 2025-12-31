import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  createTaskSchema,
  type CreateTaskFormData,
  type UpdateTaskFormData,
  updateTaskSchema,
} from '../schemas/taskSchemas';

interface TaskFormProps {
  onSubmit: (data: CreateTaskFormData | UpdateTaskFormData) => void;
  onCancel?: () => void;
  initialData?: UpdateTaskFormData;
  isLoading?: boolean;
  submitLabel?: string;
}

export const TaskForm = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
  submitLabel = 'Criar Tarefa',
}: TaskFormProps) => {
  const isEditMode = !!initialData;
  const schema = isEditMode ? updateTaskSchema : createTaskSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    // Convert datetime-local format to ISO 8601
    const formattedData = {
      ...data,
      due_date: new Date(data.due_date).toISOString(),
    };
    onSubmit(formattedData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? 'Editar Tarefa' : 'Nova Tarefa'}</CardTitle>
        <CardDescription>
          {isEditMode
            ? 'Atualize os detalhes da tarefa'
            : 'Preencha os dados para criar uma nova tarefa'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Digite o título da tarefa"
              {...register('title')}
              aria-invalid={errors.title ? 'true' : 'false'}
            />
            {errors.title && (
              <p className="text-sm text-destructive" role="alert">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <textarea
              id="description"
              placeholder="Digite a descrição da tarefa"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('description')}
              aria-invalid={errors.description ? 'true' : 'false'}
            />
            {errors.description && (
              <p className="text-sm text-destructive" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo *</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('type')}
                aria-invalid={errors.type ? 'true' : 'false'}
              >
                <option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="lazer">Lazer</option>
                <option value="saude">Saúde</option>
              </select>
              {errors.type && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <select
                id="priority"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('priority')}
                aria-invalid={errors.priority ? 'true' : 'false'}
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
              {errors.priority && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date">Data de Vencimento *</Label>
            <div className="relative">
              <Input
                id="due_date"
                type="datetime-local"
                {...register('due_date')}
                aria-invalid={errors.due_date ? 'true' : 'false'}
              />
              <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
            {errors.due_date && (
              <p className="text-sm text-destructive" role="alert">
                {errors.due_date.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1"
              >
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Salvando...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
