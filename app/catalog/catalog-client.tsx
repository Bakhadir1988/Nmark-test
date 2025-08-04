'use client';

import React from 'react';

import { useCatalog } from '@/features';
import {
  CatalogItem,
  CatalogPagination,
  CatalogSectionFaq,
} from '@/shared/types/catalogType';
import {
  PaginationSkeleton,
  ProductListSkeleton,
  TitleBlock,
} from '@/shared/ui';
import {
  FaqWidget,
  FilterWidget,
  PaginationWidget,
  ProductListWidget,
} from '@/widgets';

interface CatalogClientProps {
  items: CatalogItem[];
  section: { title: string; item_id: string; faq: CatalogSectionFaq[] };
  pagi: CatalogPagination;
}

export const CatalogClient: React.FC<CatalogClientProps> = ({
  items: initialItems,
  section,
  pagi: initialPagi,
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

  console.log('section.faq', section.faq);

  return (
    <main className="container">
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
      <FaqWidget items={section.faq} />
    </main>
  );
};
