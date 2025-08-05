# API для разделов - упрощенная версия

## Основные функции

### `getSectionIdBySlug(slug)`

Получает ID раздела по его slug.

```typescript
const sectionId = await getSectionIdBySlug('testoviy-razdel');
// Возвращает: "34c3e581" или null
```

### `getAllSections()`

Получает все разделы с иерархией.

```typescript
const sections = await getAllSections();
// Возвращает: массив разделов с подразделами
```

### `getAllSectionsFlat()`

Получает плоский список всех разделов.

```typescript
const allSections = await getAllSectionsFlat();
// Возвращает: [раздел1, раздел2, подраздел1, ...]
```

### `getSectionPath(itemId)`

Получает путь к разделу.

```typescript
const path = await getSectionPath('10608d96');
// Возвращает: массив элементов пути или null
```

## Упрощения

1. **Единая функция загрузки** - `fetchSections()` используется везде
2. **Простые поисковые функции** - `findSectionBySlug()` и `findSectionById()`
3. **Меньше дублирования кода** - общая логика вынесена в отдельные функции
4. **Опциональная цепочка** - используется `?.` для безопасного доступа

## Использование в роутинге

```typescript
// app/catalog/[...sectionPath]/page.tsx
const currentSlug = sectionPath[sectionPath.length - 1];
const data = await getCatalogBySlug(currentSlug);
```

Поддерживает любую глубину вложенности:

- `/catalog/razdel/` → slug = `razdel`
- `/catalog/razdel/podrazdel/` → slug = `podrazdel`
