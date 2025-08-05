import { notFound } from 'next/navigation';

import { getCatalogBySlug } from '@/shared/api/catalogApi';

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

  const data = await getCatalogBySlug(currentSlug);

  if (!data) {
    notFound();
  }

  const { items, section, pagi } = data;

  return <CatalogClient items={items} section={section} pagi={pagi} />;
}
