import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCatalog } from '@/shared/api/catalogApi';

import { CatalogClient } from './catalog-client';

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
    notFound();
  }

  const { items, section, pagi } = data;

  return <CatalogClient items={items} section={section} pagi={pagi} />;
}
