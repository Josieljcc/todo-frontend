import { useState } from 'react';
import type { TasksQueryParams } from '../../../hooks/useTasks';

export const useSearchFilters = () => {
  const [filters, setFilters] = useState<TasksQueryParams>({
    order: 'desc',
    page: 1,
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleFilterChange = (key: keyof TasksQueryParams, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === '' || value === undefined ? undefined : value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({ order: 'desc', page: 1 });
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) =>
      key !== 'order' && key !== 'page' && filters[key as keyof TasksQueryParams] !== undefined
  );

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return {
    filters,
    showAdvancedFilters,
    hasActiveFilters,
    setShowAdvancedFilters,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
  };
};
