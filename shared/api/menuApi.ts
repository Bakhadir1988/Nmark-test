import { MenuSection, MenuType } from '../types/menuType';

async function getMenuData(): Promise<MenuSection[] | null> {
  const url = process.env.NEXT_PUBLIC_MENU;

  if (!url) {
    console.error('NEXT_PUBLIC_MENU не определен');
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const result: MenuType = await response.json();

    return result.sections;
  } catch (error) {
    console.error(
      'Ошибка при получении данных меню:',
      error instanceof Error ? error.message : 'Неизвестная ошибка',
    );
    return null;
  }
}

export default getMenuData;
