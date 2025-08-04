import type { Meta, StoryObj } from '@storybook/react';

import { BreadcrumbItem, Breadcrumbs } from './breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'UI/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Разделитель между элементами',
    },
    className: {
      control: 'text',
      description: 'Дополнительный CSS класс',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Автоматические хлебные крошки (без items)
export const Default: Story = {
  args: {},
};

// Кастомные хлебные крошки
export const Custom: Story = {
  args: {
    items: [
      { label: 'Главная', href: '/' },
      { label: 'Каталог', href: '/catalog' },
      { label: 'Электроника', href: '/catalog/electronics' },
      { label: 'Смартфоны', isActive: true },
    ],
  },
};

// С кастомным разделителем
export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Главная', href: '/' },
      { label: 'Каталог', href: '/catalog' },
      { label: 'Товар', isActive: true },
    ],
    separator: '>',
  },
};

// Длинный путь
export const LongPath: Story = {
  args: {
    items: [
      { label: 'Главная', href: '/' },
      { label: 'Каталог', href: '/catalog' },
      { label: 'Электроника', href: '/catalog/electronics' },
      { label: 'Смартфоны', href: '/catalog/electronics/smartphones' },
      { label: 'Apple', href: '/catalog/electronics/smartphones/apple' },
      { label: 'iPhone 15 Pro', isActive: true },
    ],
  },
};

// Только один элемент (текущая страница)
export const SingleItem: Story = {
  args: {
    items: [{ label: 'Главная', isActive: true }],
  },
};

// Без ссылок (только текст)
export const TextOnly: Story = {
  args: {
    items: [
      { label: 'Главная' },
      { label: 'Каталог' },
      { label: 'Товар', isActive: true },
    ],
  },
};
