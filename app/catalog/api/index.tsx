import { CatalogType } from '@/shared/types';

export async function getCatalog(): Promise<CatalogType | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return null;
  }

  const response = await fetch(url + 'catalog/');

  const result = await response.json();
  return result;
}
