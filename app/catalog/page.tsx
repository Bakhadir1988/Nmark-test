import { Metadata } from 'next';

import getCatalog from '@/shared/api/catalogApi';

import { CatalogClient } from './catalog-client';

// Настройка динамического рендеринга
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCatalog();

  if (!data) {
    return {
      title: 'Каталог',
      description: 'Каталог товаров',
    };
  }

  const { meta } = data;

  return {
    title: meta.seo_title,
    description: meta.seo_description,
    keywords: meta.seo_keywords,
    robots: meta.robots || 'index, follow',
    openGraph: {
      title: meta.seo_title,
      description: meta.seo_description,
      type: 'website',
    },
  };
}

export default async function CatalogPage() {
  const data = await getCatalog();

  if (!data) {
    return <div>Ошибка загрузки каталога</div>;
  }

  const { items, section, pagi } = data;

  return <CatalogClient items={items} section={section} pagi={pagi} />;
}
