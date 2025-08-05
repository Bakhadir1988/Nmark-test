import React from 'react';

import { Section } from '@/shared/types/sectionType';

import styles from './bottom-tags-widget.module.css';

interface BottomTagsWidgetProps {
  sections: Section[];
}

export const BottomTagsWidget: React.FC<BottomTagsWidgetProps> = ({
  sections,
}) => {
  const bottomTagSections = sections.filter(
    (section) => section.section_type === 'Нижний тег',
  );

  if (bottomTagSections.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tags}>
        {bottomTagSections.map((section) => (
          <a key={section.item_id} href={section.url} className={styles.tag}>
            {section.title}
          </a>
        ))}
      </div>
    </div>
  );
};
