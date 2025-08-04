import { CatalogData, LoadCatalogParams } from '../model/types';

export const loadCatalogData = async ({
  page,
  filters,
  sectionId,
}: LoadCatalogParams): Promise<CatalogData> => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_API_URL не определен');
  }

  // Создаем FormData
  const formData = new FormData();
  formData.append('comp', 'catblock');
  formData.append('sect_id', sectionId);
  formData.append('page', page.toString());

  // Добавляем фильтры в правильном формате
  Object.entries(filters).forEach(([key, value]) => {
    // Пропускаем null значения (удаленные фильтры)
    if (value === null || value === undefined) {
      return;
    }

    if (key.includes('_min')) {
      // Ценовые фильтры - минимальная цена (gt - больше чем)
      const filterKey = key.replace('_min', '');
      formData.append(`filter[${filterKey}][gt]`, value.toString());
    } else if (key.includes('_max')) {
      // Ценовые фильтры - максимальная цена (lt - меньше чем)
      const filterKey = key.replace('_max', '');
      formData.append(`filter[${filterKey}][lt]`, value.toString());
    } else if (Array.isArray(value)) {
      // Массивы значений (множественные чекбоксы)
      value.forEach((item, index) => {
        formData.append(`filter[${key}][${index}]`, item.toString());
      });
    } else {
      // Обычные фильтры
      formData.append(`filter[${key}][0]`, value.toString());
    }
  });

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  return await response.json();
};
