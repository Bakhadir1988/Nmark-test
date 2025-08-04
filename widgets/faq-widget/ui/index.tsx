import React from 'react';

import { CatalogSectionFaq } from '@/shared/types/catalogType';
import { AccordionUi } from '@/shared/ui';

import styles from './faq-widget.module.css';

export const FaqWidget = ({ items }: { items: CatalogSectionFaq[] }) => {
  return (
    <section className={styles.root}>
      <div className="container">
        <h2 className={styles.title}>FAQ</h2>
        <AccordionUi items={items} />
      </div>
    </section>
  );
};
