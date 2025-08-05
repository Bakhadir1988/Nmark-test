import { Section } from '../types/sectionType';

// Кэш для избежания повторных вызовов
const sectionIdCache = new Map<string, string | null>();
let sectionsCache: Section[] | null = null;

async function fetchSections(): Promise<Section[]> {
  if (sectionsCache) {
    console.log('Using cached sections');
    return sectionsCache;
  }
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return [];

  try {
    const response = await fetch(`${url}?comp=catsections&sect_id=e8748942`);
    if (!response.ok) return [];
    const data = await response.json();
    const sections = data.sections || [];
    sectionsCache = sections;
    console.log('Cached sections:', sections.length);
    return sections;
  } catch {
    return [];
  }
}

function findSectionBySlug(sections: Section[], slug: string): Section | null {
  for (const section of sections) {
    if (section.manual_url === slug) return section;
    if (section.sections?.length) {
      const found = findSectionBySlug(section.sections, slug);
      if (found) return found;
    }
  }
  return null;
}

// Функция для получения всех тегов без привязки к конкретной секции
async function fetchAllTags(): Promise<Section[]> {
  console.log('=== fetchAllTags DEBUG ===');
  const url = process.env.NEXT_PUBLIC_API_URL;
  console.log('API URL:', url);

  if (!url) {
    console.log('No API URL found');
    return [];
  }

  try {
    const allTags: Section[] = [];

    // Получаем верхние теги
    console.log('Fetching top tags...');
    const topTagsData = new FormData();
    topTagsData.append('comp', 'catsections');
    topTagsData.append('sect_id', 'e8748942');
    topTagsData.append('section_type', 'Верхний тег');

    const topResponse = await fetch(url, { method: 'POST', body: topTagsData });
    console.log('Top tags response status:', topResponse.status);

    if (topResponse.ok) {
      const topData = await topResponse.json();
      console.log('Top tags data:', topData);
      console.log('Top tags sections:', topData.sections?.length || 0);
      allTags.push(...(topData.sections || []));
    } else {
      console.log('Top tags response not OK');
    }

    // Получаем нижние теги
    console.log('Fetching bottom tags...');
    const bottomTagsData = new FormData();
    bottomTagsData.append('comp', 'catsections');
    bottomTagsData.append('sect_id', 'e8748942');
    bottomTagsData.append('section_type', 'Нижний тег');

    const bottomResponse = await fetch(url, {
      method: 'POST',
      body: bottomTagsData,
    });
    console.log('Bottom tags response status:', bottomResponse.status);

    if (bottomResponse.ok) {
      const bottomData = await bottomResponse.json();
      console.log('Bottom tags data:', bottomData);
      console.log('Bottom tags sections:', bottomData.sections?.length || 0);
      allTags.push(...(bottomData.sections || []));
    } else {
      console.log('Bottom tags response not OK');
    }

    console.log('Total tags collected:', allTags.length);
    return allTags;
  } catch (error) {
    console.log('fetchAllTags error:', error);
    return [];
  }
}

export async function getSectionIdBySlug(
  slug: string,
  parentSlug?: string,
): Promise<string | null> {
  const cacheKey = parentSlug ? `${parentSlug}/${slug}` : slug;

  // Проверяем кэш
  if (sectionIdCache.has(cacheKey)) {
    console.log('Cache hit for:', cacheKey);
    return sectionIdCache.get(cacheKey) || null;
  }

  console.log('=== getSectionIdBySlug DEBUG ===');
  console.log('Searching for slug:', slug);
  console.log('Parent slug:', parentSlug);
  console.log('Cache key:', cacheKey);

  // Сначала ищем в обычных секциях
  const sections = await fetchSections();
  console.log('Regular sections count:', sections.length);

  const section = findSectionBySlug(sections, slug);
  if (section) {
    console.log('Found in regular sections:', section.item_id);
    sectionIdCache.set(cacheKey, section.item_id);
    return section.item_id;
  }

  // Если не найдено в секциях, ищем в тегах родительской секции
  if (parentSlug) {
    console.log(
      'Not found in regular sections, searching in parent section tags...',
    );
    try {
      const topTags = await fetchTagSections('Верхний тег', parentSlug);
      const bottomTags = await fetchTagSections('Нижний тег', parentSlug);
      const parentTags = [...topTags, ...bottomTags];

      console.log('Parent section tags count:', parentTags.length);
      parentTags.forEach((tag, index) => {
        console.log(`Parent Tag ${index}:`, {
          title: tag.title,
          manual_url: tag.manual_url,
          item_id: tag.item_id,
        });
      });

      const tagSection = findSectionBySlug(parentTags, slug);
      if (tagSection) {
        console.log('Found in parent section tags:', tagSection.item_id);
        sectionIdCache.set(cacheKey, tagSection.item_id);
        return tagSection.item_id;
      }
    } catch (error) {
      console.log('Error searching in parent section tags:', error);
    }
  }

  // Если все еще не найдено, ищем в корневых тегах
  console.log('Not found in parent tags, searching in root tags...');
  const allTags = await fetchAllTags();
  console.log('All root tags count:', allTags.length);

  const tagSection = findSectionBySlug(allTags, slug);
  if (tagSection) {
    console.log('Found in root tags:', tagSection.item_id);
    sectionIdCache.set(cacheKey, tagSection.item_id);
    return tagSection.item_id;
  }

  console.log('Not found anywhere');
  sectionIdCache.set(cacheKey, null);
  return null;
}

async function fetchTagSections(
  sectionType: string,
  slug?: string,
): Promise<Section[]> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return [];

  try {
    const sectId = slug
      ? (await getSectionIdBySlug(slug)) || 'e8748942'
      : 'e8748942';

    const formData = new FormData();
    formData.append('comp', 'catsections');
    formData.append('sect_id', sectId);
    formData.append('section_type', sectionType);

    const response = await fetch(url, { method: 'POST', body: formData });
    if (!response.ok) return [];

    const data = await response.json();
    return data.sections || [];
  } catch {
    return [];
  }
}

export const getTopTagSections = (slug?: string) =>
  fetchTagSections('Верхний тег', slug);
export const getBottomTagSections = (slug?: string) =>
  fetchTagSections('Нижний тег', slug);
