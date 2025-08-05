# Логика показа фильтра

Фильтр показывается только при выполнении всех условий:

## Условия показа фильтра

### 1. В CatalogClient

```typescript
// Фильтр показывается только если есть товары
{items.length > 0 && (
  <FilterWidget
    sectionId={section.item_id}
    onFilterChange={handleFilterChange}
    currentFilters={filters}
    hasItems={items.length > 0}
  />
)}
```

### 2. В FilterWidget

```typescript
// Не показываем фильтр, если нет товаров
if (!hasItems) {
  return null;
}
```

### 3. В ProductFilter

```typescript
// Проверяем, что фильтр загружен и есть данные
const hasFilterData = filter && filter.props && filter.props.length > 0;

// Проверяем, есть ли свойства для фильтрации
const hasFilterProps = allProps.length > 0;

// Проверяем, есть ли реальные варианты для фильтрации
const hasRealFilterOptions = hasRealFilterProperties(allProps);

// Проверяем, нужно ли показывать фильтр вообще
const shouldShowFilter = hasFilterProps && hasFilterData && hasRealFilterOptions;

// Если фильтр загружен, но нет реальных свойств - не показываем ничего
if (hasCheckedFilter && !shouldShowFilter) {
  return null;
}

// Показываем скелетоны только если еще не проверяли фильтр
if (loading) {
  if (hasCheckedFilter && !shouldShowFilter) {
    return null;
  }
  return <FilterListSkeleton count={8} />;
}
```

## Предотвращение показа скелетона

Добавлено состояние `hasCheckedFilter` для предотвращения показа скелетона для разделов без свойств:

```typescript
const [hasCheckedFilter, setHasCheckedFilter] = useState(false);

// После загрузки фильтра
setHasCheckedFilter(true);

// Проверяем перед показом скелетона
if (hasCheckedFilter && !shouldShowFilter) {
  return null;
}
```

## Проверка реальных свойств фильтрации

Функция `hasRealFilterProperties()` проверяет:

### Для ценового фильтра (PRICE):

```typescript
const minPrice = parseFloat(priceFilter.min) || 0;
const maxPrice = parseFloat(priceFilter.max) || 0;
return maxPrice > minPrice; // Есть диапазон цен
```

### Для перечислений (ENUM/STRING):

```typescript
return Object.values(enumFilter).some(value =>
  parseInt(value.total_count) > 0
);
```

## Логика обработки данных фильтра

1. **Убираем корневой тип** - `type_name !== 'Корневой тип'`
2. **Убираем sections_objects** - `tpl_key !== 'sections_objects'`
3. **Объединяем все свойства** из групп `__nogroup` и `chars`
4. **Проверяем количество** - `allProps.length > 0`
5. **Проверяем реальные варианты** - `hasRealFilterProperties()`
6. **Предотвращаем показ скелетона** - `hasCheckedFilter`

## Результат

Фильтр НЕ показывается если:

- ❌ Нет товаров в разделе
- ❌ API вернул пустой ответ
- ❌ Нет свойств для фильтрации
- ❌ Все свойства исключены логикой фильтрации
- ❌ Нет реальных вариантов для фильтрации (нулевые значения)
- ❌ **Уже проверяли фильтр и знаем, что свойств нет** ← **НОВОЕ**

Фильтр показывается если:

- ✅ Есть товары в разделе
- ✅ API вернул данные
- ✅ Есть свойства для фильтрации после обработки
- ✅ Есть реальные варианты для фильтрации
- ✅ **Не проверяли фильтр ранее или есть свойства** ← **НОВОЕ**

## Преимущества

- 🚫 **Нет мигания скелетона** для разделов без свойств
- ⚡ **Быстрая загрузка** - фильтр не показывается сразу
- 🎯 **Точная логика** - проверка на реальные свойства
- 🔄 **Кэширование состояния** - запоминаем результаты проверки
