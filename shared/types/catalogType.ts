export type CatalogType = {
  meta: CatalogMeta;
  items: CatalogItem[];
  pagi: CatalogPagination;
  section: CatalogSection;
};

type CatalogMeta = {
  short_title: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  robots: string | null;
  h1: string;
};

export type CatalogItem = {
  chars: CatalogItemChars;
  item_id: string;
  title: string;
  rating: number | null;
  price: string;
  imgs: string[];
  content: string | null;
  url: string;
};

type CatalogItemChars = {
  class: string;
  type: string;
  vendor: string;
  density: string;
  alcohol: string;
  test_string: string;
};

export type CatalogPagination = {
  total_items: string;
  items_per_page: string;
  total_pages: number;
  current_page: number;
  from: number;
  to: number;
  window_size: number;
  window_first_page: number;
  window_last_page: number;
  pages: number[];
};

type CatalogSection = {
  imgs: string[];
  item_id: string;
  title: string;
  __path: CatalogSectionPath[];
};

type CatalogSectionPath = {
  item_id: string;
  title: string;
  url: string;
};
