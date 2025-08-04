'use client';

import React, { useState } from 'react';

import { MenuSection } from '@/shared/types/menuType';

import styles from './menu.module.css';

interface MenuProps {
  sections: MenuSection[];
}

export const Menu: React.FC<MenuProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <nav className={styles.root}>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li
            key={section.item_id}
            className={styles.item}
            onMouseEnter={() => setActiveSection(section.item_id)}
            onMouseLeave={() => setActiveSection(null)}
          >
            <a href={section.url} className={styles.link}>
              {section.title}
            </a>

            {section.sections && section.sections.length > 0 && (
              <div
                className={`${styles.dropdown} ${activeSection === section.item_id ? styles.active : ''}`}
              >
                <ul className={styles.dropdown_list}>
                  {section.sections.map((subSection) => (
                    <li
                      key={subSection.item_id}
                      className={styles.dropdown_item}
                    >
                      <a href={subSection.url} className={styles.dropdown_link}>
                        {subSection.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
