import React from 'react';

import styles from './title-block.module.css';

export const TitleBlock = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <section className={styles.root}>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
};
