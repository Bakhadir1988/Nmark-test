import React from 'react';

import { ProductCard } from '@/entities';
import { CatalogItem } from '@/shared/types/catalogType';

import styles from './product-list.module.css';

interface ProductListProps {
  items: CatalogItem[];
}

export const ProductListWidget: React.FC<ProductListProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {items.map((item) => (
        <ProductCard key={item.item_id} item={item} />
      ))}
    </div>
  );
};
