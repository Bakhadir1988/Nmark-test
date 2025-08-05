import { CatalogType } from '../types/catalogType';
import { getSectionIdBySlug } from './sectionsApi';

export async function getCatalogBySlug(
  slug: string,
  parentSlug?: string,
): Promise<CatalogType | null> {
  console.log('=== getCatalogBySlug DEBUG ===');
  const baseUrl = process.env.NEXT_PUBLIC_CATALOG_SECTION_ID;
  console.log('Base Catalog URL:', baseUrl);

  if (!baseUrl) {
    console.log('No NEXT_PUBLIC_CATALOG_SECTION_ID found');
    return null;
  }

  try {
    const sectionId = await getSectionIdBySlug(slug, parentSlug);
    console.log('Found section ID:', sectionId);

    if (!sectionId) {
      console.log('No section ID found');
      return null;
    }

    // Используем правильный URL для catblock вместо catsections
    const fullUrl =
      baseUrl.replace('comp=catsections', 'comp=catblock') + sectionId;
    console.log('Making catblock request to:', fullUrl);

    const formData = new FormData();
    formData.append('comp', 'catblock');
    formData.append('sect_id', sectionId);

    const response = await fetch(fullUrl, {
      method: 'POST',
      body: formData,
    });

    console.log('Catblock response status:', response.status);

    if (!response.ok) {
      console.log('Catblock response not OK');
      return null;
    }

    const responseText = await response.text();
    console.log('Catblock response length:', responseText.length);

    const result = JSON.parse(responseText);
    console.log('Catblock parsed result:', {
      hasItems: !!result.items,
      itemsCount: result.items?.length || 0,
      hasSection: !!result.section,
      hasPagi: !!result.pagi,
    });

    return result;
  } catch (error) {
    console.log('getCatalogBySlug error:', error);
    return null;
  }
}
