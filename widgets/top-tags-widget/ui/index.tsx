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

  if (topTagSections.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tags}>
        {topTagSections.map((section) => (
          <a key={section.item_id} href={section.url} className={styles.tag}>
            {section.title}
          </a>
        ))}
      </div>
    </div>
  );
};
