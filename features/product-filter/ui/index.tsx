'use client';

import React, { useEffect, useState } from 'react';

import { FilterItem } from '@/entities';
import { FilterListSkeleton } from '@/shared/ui';

import getFilterCatalog from '../api';
import { FilterPropType, FilterResponse } from '../model/types';
import styles from './product-filter.module.css';

// Вспомогательная функция для проверки реальных свойств фильтрации
function hasRealFilterProperties(props: FilterPropType[]): boolean {
  return props.some((prop) => {
    if (prop.type === 'PRICE') {
      const priceFilter = prop.filter as { min: string; max: string };
      const minPrice = parseFloat(priceFilter.min) || 0;
      const maxPrice = parseFloat(priceFilter.max) || 0;
      return maxPrice > minPrice; // Есть диапазон цен
    }

    if (prop.type === 'ENUM' || prop.type === 'STRING') {
      const enumFilter = prop.filter as {
        [key: string]: { label: string; total_count: string };
      };
      // Проверяем, есть ли варианты с ненулевым количеством
      return Object.values(enumFilter).some(
        (value) => parseInt(value.total_count) > 0,
      );
    }

    return false;
  });
}

interface ProductFilterProps {
  sectionId: string;
  onFilterChange?: (filters: {
    [key: string]: string | number | boolean | string[] | null;
  }) => void;
  currentFilters?: {
    [key: string]: string | number | boolean | string[] | null;
  };
}

export const ProductFilter = ({
  sectionId,
  onFilterChange,
  currentFilters,
}: ProductFilterProps) => {
  const [filter, setFilter] = useState<FilterResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCheckedFilter, setHasCheckedFilter] = useState(false);

  // Убираем корневой тип из массива
  const filterProps = filter?.props.filter(
    (item) => item.type_name !== 'Корневой тип',
  );

  // Убираем группу sections_objects с объектами
  const groups = Object.values(filterProps?.[0]?.groups || {}).filter(
    (item) => item.tpl_key !== 'sections_objects',
  );

  // Объединяем props из __nogroup и chars в один массив
  const allProps = groups.reduce((acc, group) => {
    const groupProps = Object.values(group.props || {});
    return [...acc, ...groupProps];
  }, [] as FilterPropType[]);

  // Проверяем, есть ли свойства для фильтрации
  const hasFilterProps = allProps.length > 0;

  // Проверяем, что фильтр загружен и есть данные
  const hasFilterData = filter && filter.props && filter.props.length > 0;

  // Дополнительная проверка: есть ли реальные варианты для фильтрации
  const hasRealFilterOptions = hasRealFilterProperties(allProps);

  // Проверяем, нужно ли показывать фильтр вообще
  const shouldShowFilter =
    hasFilterProps && hasFilterData && hasRealFilterOptions;

  // Загружаем фильтр
  useEffect(() => {
    setLoading(true);
    setError(null);
    setHasCheckedFilter(false);

    const fetchFilter = async () => {
      try {
        const filter = await getFilterCatalog(sectionId);
        setFilter(filter);
        setHasCheckedFilter(true);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Произошла ошибка');
        setHasCheckedFilter(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFilter();
  }, [sectionId]);

  // Если фильтр загружен, но нет реальных свойств - не показываем ничего
  if (hasCheckedFilter && !shouldShowFilter) {
    return null;
  }

  if (loading) {
    // Показываем скелетоны только если еще не проверяли фильтр
    // или если есть данные фильтра
    if (hasCheckedFilter && !shouldShowFilter) {
      return null;
    }

    const skeletonCount = 8;
    return <FilterListSkeleton count={skeletonCount} />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  // Не показываем фильтр, если нет свойств для фильтрации
  if (!shouldShowFilter) {
    return null;
  }

  return (
    <form className={styles.root}>
      {allProps.map((prop) => (
        <FilterItem
          key={prop.prop_id}
          prop={prop}
          onFilterChange={onFilterChange}
          currentFilters={currentFilters}
        />
      ))}
    </form>
  );
};
