import { CatalogType } from '../types/catalogType';

async function getCatalog(): Promise<CatalogType | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return null;
  }

  try {
    const response = await fetch(url + 'catalog/');

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const result: CatalogType = await response.json();

    return result;
  } catch (error) {
    console.error(
      'Ошибка при получении данных каталога:',
      error instanceof Error ? error.message : 'Неизвестная ошибка',
    );
    return null;
  }
}

export default getCatalog;
