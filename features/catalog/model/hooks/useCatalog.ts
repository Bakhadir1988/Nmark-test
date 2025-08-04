import { useState } from 'react';

import { CatalogItem, CatalogPagination } from '@/shared/types/catalogType';

import { loadCatalogData } from '../../api/catalogApi';
import { FilterState } from '../types';

export const useCatalog = (
  initialItems: CatalogItem[],
  initialPagi: CatalogPagination,
  sectionId: string,
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<CatalogItem[]>(initialItems);
  const [pagi, setPagi] = useState<CatalogPagination>(initialPagi);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});

  const handlePageChange = async (page: number) => {
    try {
      setLoading(true);
      const data = await loadCatalogData({
        page,
        filters,
        sectionId,
      });
      setItems(data.items);
      setPagi(data.pagi);
      setCurrentPage(page);
    } catch (error) {
      console.error('Ошибка при загрузке каталога:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (newFilters: FilterState) => {
    // Объединяем новые фильтры с существующими
    const updatedFilters = { ...filters, ...newFilters };

    // Удаляем пустые фильтры (когда значение пустое или массив пустой)
    Object.keys(updatedFilters).forEach((key) => {
      const value = updatedFilters[key];
      if (
        value === '' ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      ) {
        delete updatedFilters[key];
      }
    });

    setFilters(updatedFilters);
    setCurrentPage(1);

    try {
      setLoading(true);
      const data = await loadCatalogData({
        page: 1,
        filters: updatedFilters,
        sectionId,
      });
      setItems(data.items);
      setPagi(data.pagi);
    } catch (error) {
      console.error('Ошибка при загрузке каталога:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    pagi,
    currentPage,
    loading,
    filters,
    handlePageChange,
    handleFilterChange,
  };
};
