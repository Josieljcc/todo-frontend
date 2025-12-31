import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TaskFilters } from '../schemas/taskSchemas';

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  onReset: () => void;
}

export const TaskFilters = ({
  filters,
  onFiltersChange,
  onReset,
}: TaskFiltersProps) => {
  const handleFilterChange = (key: keyof TaskFilters, value: unknown) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Buscar</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Buscar por título ou descrição..."
                value={filters.search ?? ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={filters.type ?? ''}
                onChange={(e) =>
                  handleFilterChange(
                    'type',
                    e.target.value
                      ? (e.target.value as TaskFilters['type'])
                      : undefined,
                  )
                }
              >
                <option value="">Todos</option>
                <option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="lazer">Lazer</option>
                <option value="saude">Saúde</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="completed">Status</Label>
              <select
                id="completed"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={
                  filters.completed === undefined
                    ? ''
                    : filters.completed
                      ? 'true'
                      : 'false'
                }
                onChange={(e) =>
                  handleFilterChange(
                    'completed',
                    e.target.value === ''
                      ? undefined
                      : e.target.value === 'true',
                  )
                }
              >
                <option value="">Todas</option>
                <option value="false">Pendentes</option>
                <option value="true">Concluídas</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period">Período</Label>
              <select
                id="period"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={filters.period ?? ''}
                onChange={(e) =>
                  handleFilterChange(
                    'period',
                    e.target.value
                      ? (e.target.value as TaskFilters['period'])
                      : undefined,
                  )
                }
              >
                <option value="">Todos</option>
                <option value="overdue">Atrasadas</option>
                <option value="today">Hoje</option>
                <option value="this_week">Esta Semana</option>
                <option value="this_month">Este Mês</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_by">Ordenar por</Label>
              <select
                id="sort_by"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={filters.sort_by ?? ''}
                onChange={(e) =>
                  handleFilterChange(
                    'sort_by',
                    e.target.value
                      ? (e.target.value as TaskFilters['sort_by'])
                      : undefined,
                  )
                }
              >
                <option value="">Padrão</option>
                <option value="created_at">Data de Criação</option>
                <option value="due_date">Data de Vencimento</option>
                <option value="title">Título</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              className="flex-1"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
