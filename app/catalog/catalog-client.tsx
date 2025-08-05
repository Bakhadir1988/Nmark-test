'use client';

import React from 'react';

import { useCatalog } from '@/features';
import {
  CatalogItem,
  CatalogPagination,
  CatalogSectionFaq,
} from '@/shared/types/catalogType';
import { Section } from '@/shared/types/sectionType';
import {
  Breadcrumbs,
  PaginationSkeleton,
  ProductListSkeleton,
  TitleBlock,
} from '@/shared/ui';
import {
  BottomTagsWidget,
  FaqWidget,
  FilterWidget,
  PaginationWidget,
  ProductListWidget,
  TopTagsWidget,
} from '@/widgets';

interface CatalogClientProps {
  items: CatalogItem[];
  section: {
    title: string;
    item_id: string;
    faq: CatalogSectionFaq[];
    __path?: { item_id: string; title: string; url: string }[];
  };
  pagi: CatalogPagination;
  topTagSections?: Section[];
  bottomTagSections?: Section[];
}

export const CatalogClient: React.FC<CatalogClientProps> = ({
  items: initialItems,
  section,
  pagi: initialPagi,
  topTagSections = [],
  bottomTagSections = [],
}) => {
  const {
    items,
    pagi,
    currentPage,
    loading,
    filters,
    handlePageChange,
    handleFilterChange,
  } = useCatalog(initialItems, initialPagi, section.item_id);

  console.log('filters', filters);

  return (
    <main className="container">
      <Breadcrumbs path={section.__path} />
      <TitleBlock title={section.title} />

      {/* Верхние теги */}
      <TopTagsWidget sections={topTagSections} />

      {/* Показываем фильтр только если есть товары */}
      {items.length > 0 && (
        <FilterWidget
          sectionId={section.item_id}
          onFilterChange={handleFilterChange}
          currentFilters={filters}
          hasItems={items.length > 0}
        />
      )}

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

      {/* Нижние теги */}
      <BottomTagsWidget sections={bottomTagSections} />

      <FaqWidget items={section.faq} />
    </main>
  );
};
