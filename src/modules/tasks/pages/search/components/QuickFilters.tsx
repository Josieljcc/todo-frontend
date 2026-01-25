import { Button } from '@/components/ui/button';
import type { TasksQueryParams } from '../../../hooks/useTasks';

interface QuickFiltersProps {
  filters: TasksQueryParams;
  onFilterChange: (key: keyof TasksQueryParams, value: unknown) => void;
}

export const QuickFilters = ({ filters, onFilterChange }: QuickFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={filters.completed === false ? 'filterActive' : 'filter'}
        size="sm"
        onClick={() => onFilterChange('completed', filters.completed === false ? undefined : false)}
        className="rounded-xl"
      >
        Pendentes
      </Button>
      <Button
        variant={filters.completed === true ? 'filterActive' : 'filter'}
        size="sm"
        onClick={() => onFilterChange('completed', filters.completed === true ? undefined : true)}
        className="rounded-xl"
      >
        Concluídas
      </Button>
      <Button
        variant={filters.period === 'overdue' ? 'filterActive' : 'filter'}
        size="sm"
        onClick={() =>
          onFilterChange('period', filters.period === 'overdue' ? undefined : 'overdue')
        }
        className="rounded-xl"
      >
        Atrasadas
      </Button>
      <Button
        variant={filters.period === 'today' ? 'filterActive' : 'filter'}
        size="sm"
        onClick={() => onFilterChange('period', filters.period === 'today' ? undefined : 'today')}
        className="rounded-xl"
      >
        Hoje
      </Button>
    </div>
  );
};
