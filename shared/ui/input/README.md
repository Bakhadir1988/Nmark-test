# Input Component

Универсальный компонент для ввода данных.

## Использование

```tsx
import { Input } from "@/shared/ui/input";

<Input label="Email" type="email" placeholder="example@email.com" required />;
```

## Props

- `type` - тип поля: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
- `placeholder` - текст подсказки
- `label` - метка поля
- `value` - значение поля
- `onChange` - обработчик изменения
- `onBlur` - обработчик потери фокуса
- `onFocus` - обработчик получения фокуса
- `disabled` - отключено ли поле
- `error` - текст ошибки
- `required` - обязательное ли поле
- `min` - минимальное значение (для number)
- `max` - максимальное значение (для number)
- `step` - шаг (для number)

## Примеры

- Текстовое поле с меткой
- Поле email с валидацией
- Поле пароля с ошибкой
- Числовое поле с ограничениями
- Отключенное поле
