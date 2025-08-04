'use client';

import React, { useEffect, useState } from 'react';

import { FilterItem } from '@/entities';
import { FilterListSkeleton } from '@/shared/ui';

import getFilterCatalog from '../api';
import { FilterPropType, FilterResponse } from '../model/types';
import styles from './product-filter.module.css';

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

  // Убираем корневой тип из массива
  const filterProps = filter?.props.filter(
    (item) => item.type_name !== 'Корневой тип',
  );

  // Убираем группу sections_objects с объектами
  const groups = Object.values(filterProps?.[0].groups || {}).filter(
    (item) => item.tpl_key !== 'sections_objects',
  );

  // Объединяем props из __nogroup и chars в один массив
  const allProps = groups.reduce((acc, group) => {
    const groupProps = Object.values(group.props || {});
    return [...acc, ...groupProps];
  }, [] as FilterPropType[]);

  // Загружаем фильтр
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchFilter = async () => {
      try {
        const filter = await getFilterCatalog(sectionId);
        setFilter(filter);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchFilter();
  }, [sectionId]);

  if (loading) {
    // Показываем скелетоны в зависимости от количества фильтров
    // Используем фиксированное количество для лучшего UX
    const skeletonCount = 8; // Показываем 8 скелетонов как в реальном случае
    return <FilterListSkeleton count={skeletonCount} />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
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
