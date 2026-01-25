import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { TasksQueryParams } from '../../../hooks/useTasks';
import { AdvancedFiltersFields } from './AdvancedFiltersFields';

interface AdvancedFiltersProps {
  filters: TasksQueryParams;
  onFilterChange: (key: keyof TasksQueryParams, value: unknown) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export const AdvancedFilters = ({
  filters,
  onFilterChange,
  onReset,
  hasActiveFilters,
}: AdvancedFiltersProps) => {
  return (
    <Card className="rounded-3xl">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-4">Filtros Avançados</h3>

          <AdvancedFiltersFields filters={filters} onFilterChange={onFilterChange} />

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button variant="outline" onClick={onReset} className="w-full rounded-xl">
              Limpar Filtros
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
