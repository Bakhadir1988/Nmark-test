import { Section } from '../types/sectionType';

// Упрощенная функция для получения всех разделов
async function fetchSections(): Promise<Section[]> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return [];
  }

  try {
    const response = await fetch(`${url}?comp=catsections&sect_id=e8748942`);
    if (!response.ok) {
      console.error('Ошибка при получении разделов каталога:', response.status);
      return [];
    }

    const data = await response.json();
    return data.sections || [];
  } catch (error) {
    console.error('Ошибка при получении разделов каталога:', error);
    return [];
  }
}

// Упрощенная функция поиска раздела по slug
function findSectionBySlug(sections: Section[], slug: string): Section | null {
  for (const section of sections) {
    if (section.manual_url === slug) {
      return section;
    }

    if (section.sections?.length) {
      const found = findSectionBySlug(section.sections, slug);
      if (found) return found;
    }
  }
  return null;
}

// Основная функция для получения item_id по slug
export async function getSectionIdBySlug(slug: string): Promise<string | null> {
  const sections = await fetchSections();
  const section = findSectionBySlug(sections, slug);
  return section?.item_id || null;
}

// Функция для получения всех разделов
export async function getAllSections(): Promise<Section[]> {
  return fetchSections();
}

// Упрощенная функция для получения плоского списка
export async function getAllSectionsFlat(): Promise<Section[]> {
  const sections = await fetchSections();
  const flat: Section[] = [];

  function flatten(sectionsList: Section[]) {
    for (const section of sectionsList) {
      flat.push(section);
      if (section.sections?.length) {
        flatten(section.sections);
      }
    }
  }

  flatten(sections);
  return flat;
}

// Функция для получения пути к разделу
export async function getSectionPath(
  itemId: string,
): Promise<Section['__path'] | null> {
  const sections = await fetchSections();
  const section = findSectionById(sections, itemId);
  return section?.__path || null;
}

// Вспомогательная функция поиска по ID
function findSectionById(sections: Section[], itemId: string): Section | null {
  for (const section of sections) {
    if (section.item_id === itemId) {
      return section;
    }

    if (section.sections?.length) {
      const found = findSectionById(section.sections, itemId);
      if (found) return found;
    }
  }
  return null;
}
