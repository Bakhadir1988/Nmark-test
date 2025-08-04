import { FilterResponse } from '../model/types';

async function getFilterCatalog(
  sectionId: string,
): Promise<FilterResponse | null> {
  const url = process.env.NEXT_PUBLIC_FILTER_ID;

  if (!url) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return null;
  }

  try {
    const response = await fetch(`${url}${sectionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        section_id: sectionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const result: FilterResponse = await response.json();

    return result;
  } catch (error) {
    console.error(
      'Ошибка при получении данных фильтра:',
      error instanceof Error ? error.message : 'Неизвестная ошибка',
    );
    return null;
  }
}

export default getFilterCatalog;
