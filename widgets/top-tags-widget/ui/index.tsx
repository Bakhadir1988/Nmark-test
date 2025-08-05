import Link from 'next/link';
import React from 'react';

import { Section } from '@/shared/types/sectionType';

import styles from './top-tags-widget.module.css';

interface TopTagsWidgetProps {
  sections: Section[];
}

export const TopTagsWidget: React.FC<TopTagsWidgetProps> = ({ sections }) => {
  const topTagSections = sections.filter(
    (section) => section.section_type === 'Верхний тег',
  );

  // Логирование для отладки
  console.log('=== TOP TAGS DEBUG ===');
  topTagSections.forEach((section, index) => {
    console.log(`Tag ${index}:`, {
      title: section.title,
      url: section.url,
      manual_url: section.manual_url,
      item_id: section.item_id,
    });
  });

  if (topTagSections.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tags}>
        {topTagSections.map((section) => (
          <Link key={section.item_id} href={section.url} className={styles.tag}>
            {section.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
