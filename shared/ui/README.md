# UI Components

Этот каталог содержит переиспользуемые UI компоненты.

## Структура

- `button/` - кнопка
- `checkbox/` - чекбокс
- `input/` - поле ввода
- `price-slider/` - слайдер для выбора цены
- `skeleton/` - скелетоны для загрузки
- `title-block/` - блок заголовка

## Использование

Все компоненты экспортируются из `index.ts`:

```typescript
import { Button, Checkbox, Input, PriceSlider, TitleBlock } from '@/shared/ui';
```

## Технологии

- **Radix UI** - для доступных и производительных компонентов
- **CSS Modules** - для изолированных стилей
- **TypeScript** - для типизации
