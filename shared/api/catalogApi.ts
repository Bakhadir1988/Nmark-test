import { CatalogType } from '../types/catalogType';
import { getSectionIdBySlug } from './sectionsApi';

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

export async function getCatalogBySlug(
  slug: string,
): Promise<CatalogType | null> {
  const url = process.env.NEXT_PUBLIC_CATALOG_SECTION_ID;
  if (!url) {
    console.error('NEXT_PUBLIC_CATALOG_SECTION_ID не определен');
    return null;
  }

  try {
    const sectionId = await getSectionIdBySlug(slug);

    if (!sectionId) {
      console.error('Не найден section_id для slug:', slug);
      return null;
    }
    const formData = new FormData();
    formData.append('comp', 'catblock');
    formData.append('sect_id', sectionId);

    const response = await fetch(url + sectionId, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const responseText = await response.text();

    return JSON.parse(responseText);
  } catch (error) {
    console.error('Ошибка при получении данных каталога по slug:', error);
    return null;
  }
}
