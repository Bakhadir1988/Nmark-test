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
  hasItems?: boolean; // Добавляем проп для проверки наличия товаров
}

export const FilterWidget = ({
  sectionId,
  onFilterChange,
  currentFilters,
  hasItems = true, // По умолчанию показываем
}: FilterWidgetProps) => {
  // Не показываем фильтр, если нет товаров
  if (!hasItems) {
    return null;
  }

  return (
    <ProductFilter
      sectionId={sectionId}
      onFilterChange={onFilterChange}
      currentFilters={currentFilters}
    />
  );
};
