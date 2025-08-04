import React from 'react';

import { ProductFilter } from '@/features';

interface FilterWidgetProps {
  sectionId: string;
  onFilterChange?: (filters: {
    [key: string]: string | number | boolean | string[] | null;
  }) => void;
  currentFilters?: {
    [key: string]: string | number | boolean | string[] | null;
  };
}

export const FilterWidget = ({
  sectionId,
  onFilterChange,
  currentFilters,
}: FilterWidgetProps) => {
  return (
    <ProductFilter
      sectionId={sectionId}
      onFilterChange={onFilterChange}
      currentFilters={currentFilters}
    />
  );
};
