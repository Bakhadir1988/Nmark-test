import { notFound } from 'next/navigation';

import { getCatalogBySlug } from '@/shared/api/catalogApi';
import {
  getBottomTagSections,
  getTopTagSections,
} from '@/shared/api/sectionsApi';

import { CatalogClient } from '../catalog-client';

interface CatalogSectionPageProps {
  params: Promise<{
    sectionPath: string[];
  }>;
}

export default async function CatalogSectionPage({
  params,
}: CatalogSectionPageProps) {
  const { sectionPath } = await params;

  const currentSlug = sectionPath[sectionPath.length - 1];
  const parentSlug =
    sectionPath.length > 1 ? sectionPath[sectionPath.length - 2] : undefined;

  // Логирование для отладки
  console.log('=== DEBUG ===');
  console.log('sectionPath:', sectionPath);
  console.log('currentSlug:', currentSlug);
  console.log('parentSlug:', parentSlug);
  console.log('Full path as slug:', sectionPath.join('/'));

  // Выполняем все запросы параллельно для ускорения
  const [data, topTagSections, bottomTagSections] = await Promise.all([
    getCatalogBySlug(currentSlug, parentSlug),
    getTopTagSections(currentSlug),
    getBottomTagSections(currentSlug),
  ]);

  if (!data) {
    notFound();
  }

  const { items, section, pagi } = data;

  return (
    <CatalogClient
      items={items}
      section={section}
      pagi={pagi}
      topTagSections={topTagSections}
      bottomTagSections={bottomTagSections}
    />
  );
}
