'use client';

import React, { useState } from 'react';

import { CatalogItem, CatalogPagination } from '@/shared/types/catalogType';
import {
  PaginationSkeleton,
  ProductListSkeleton,
  TitleBlock,
} from '@/shared/ui';
import { FilterWidget, PaginationWidget, ProductListWidget } from '@/widgets';

interface CatalogClientProps {
  items: CatalogItem[];
  section: { title: string; item_id: string };
  pagi: CatalogPagination;
}

interface FilterState {
  [key: string]: string | number | boolean | string[] | null;
}

export const CatalogClient: React.FC<CatalogClientProps> = ({
  items: initialItems,
  section,
  pagi: initialPagi,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<CatalogItem[]>(initialItems);
  const [pagi, setPagi] = useState<CatalogPagination>(initialPagi);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});

  console.log('filters', filters);

  // Функция для загрузки данных с фильтрами и пагинацией
  const loadCatalogData = async (page: number, newFilters: FilterState) => {
    setLoading(true);

    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      if (!url) {
        console.error('NEXT_PUBLIC_API_URL не определен');
        return;
      }

      // Создаем FormData
      const formData = new FormData();
      formData.append('comp', 'catblock');
      formData.append('sect_id', section.item_id);
      formData.append('page', page.toString());

      // Добавляем фильтры в правильном формате
      Object.entries(newFilters).forEach(([key, value]) => {
        console.log('key', key);
        console.log('value', value);

        // Пропускаем null значения (удаленные фильтры)
        if (value === null || value === undefined) {
          return;
        }

        if (key.includes('_min')) {
          // Ценовые фильтры - минимальная цена (gt - больше чем)
          const filterKey = key.replace('_min', '');
          formData.append(`filter[${filterKey}][gt]`, value.toString());
        } else if (key.includes('_max')) {
          // Ценовые фильтры - максимальная цена (lt - меньше чем)
          const filterKey = key.replace('_max', '');
          formData.append(`filter[${filterKey}][lt]`, value.toString());
        } else if (Array.isArray(value)) {
          // Массивы значений (множественные чекбоксы)
          value.forEach((item, index) => {
            formData.append(`filter[${key}][${index}]`, item.toString());
          });
        } else {
          // Обычные фильтры
          formData.append(`filter[${key}][0]`, value.toString());
        }
      });

      console.log('Отправляем FormData:', formData);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      const data = await response.json();
      setItems(data.items);
      setPagi(data.pagi);
      setCurrentPage(page);
    } catch (error) {
      console.error('Ошибка при загрузке каталога:', error);
    } finally {
      setLoading(false);
    }
  };

  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    loadCatalogData(page, filters);
  };

  // Обработчик изменения фильтров
  const handleFilterChange = (newFilters: FilterState) => {
    console.log('handleFilterChange called with:', newFilters);
    console.log('Current filters before update:', filters);

    // Объединяем новые фильтры с существующими
    const updatedFilters = { ...filters, ...newFilters };
    console.log('Updated filters before cleanup:', updatedFilters);

    // Удаляем пустые фильтры (когда значение пустое или массив пустой)
    Object.keys(updatedFilters).forEach((key) => {
      const value = updatedFilters[key];
      if (
        value === '' ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      ) {
        console.log('Removing filter:', key, 'with value:', value);
        delete updatedFilters[key];
      }
    });

    setFilters(updatedFilters);
    setCurrentPage(1);
    loadCatalogData(1, updatedFilters);
  };

  return (
    <main>
      <TitleBlock title={section.title} />
      <FilterWidget
        sectionId={section.item_id}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />
      {loading ? (
        <>
          <ProductListSkeleton count={items.length > 0 ? items.length : 12} />
          <PaginationSkeleton
            pageCount={pagi.total_pages > 0 ? pagi.total_pages : 5}
          />
        </>
      ) : (
        <>
          <ProductListWidget items={items} />
          <PaginationWidget
            currentPage={currentPage}
            totalPages={pagi.total_pages}
            onPageChange={handlePageChange}
            totalItems={parseInt(pagi.total_items)}
            itemsPerPage={parseInt(pagi.items_per_page)}
          />
        </>
      )}
    </main>
  );
};
