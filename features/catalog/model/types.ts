import { CatalogItem, CatalogPagination } from '@/shared/types/catalogType';

export interface FilterState {
  [key: string]: string | number | boolean | string[] | null;
}

export interface CatalogData {
  items: CatalogItem[];
  pagi: CatalogPagination;
}

export interface LoadCatalogParams {
  page: number;
  filters: FilterState;
  sectionId: string;
}
