'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import styles from './breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  separator?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
}) => {
  const pathname = usePathname();

  // Если items не переданы, генерируем автоматически из pathname
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);

  return (
    <section className={styles.root}>
      <div className="container">
        <nav aria-label="Хлебные крошки">
          <ol className={styles.list}>
            {breadcrumbItems.map((item, index) => (
              <li key={index} className={styles.item}>
                {index > 0 && (
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                )}
                {item.href && !item.isActive ? (
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`${styles.text} ${
                      item.isActive ? styles.active : ''
                    }`}
                    aria-current={item.isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
};

// Функция для генерации хлебных крошек из pathname
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Главная', href: '/' }];

  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Преобразуем segment в читаемый label
    const label = formatSegmentLabel(segment);

    breadcrumbs.push({
      label,
      href: index === segments.length - 1 ? undefined : currentPath,
      isActive: index === segments.length - 1,
    });
  });

  return breadcrumbs;
}

// Функция для форматирования сегментов пути в читаемые названия
function formatSegmentLabel(segment: string): string {
  // Убираем дефисы и подчеркивания, делаем первую букву заглавной
  const formatted = segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Специальные случаи для известных путей
  const pathMappings: Record<string, string> = {
    catalog: 'Каталог',
    product: 'Товар',
    category: 'Категория',
    search: 'Поиск',
    cart: 'Корзина',
    checkout: 'Оформление заказа',
    account: 'Личный кабинет',
    orders: 'Заказы',
    profile: 'Профиль',
    settings: 'Настройки',
  };

  return pathMappings[segment.toLowerCase()] || formatted;
}
