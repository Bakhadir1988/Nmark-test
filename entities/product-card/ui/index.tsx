import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CatalogItem } from '@/shared/types/catalogType';

import styles from './product-card.module.css';

interface ProductCardProps {
  item: CatalogItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  return (
    <Link href={item.url} className={styles.root}>
      <div className={styles.image}>
        {item.imgs && item.imgs.length > 0 && (
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imgs[0]}`}
            alt={item.title}
            width={235}
            height={270}
            priority
          />
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>

        <div className={styles.chars}>
          {item.chars.class && (
            <span className={styles.char}>Класс: {item.chars.class}</span>
          )}
          {item.chars.type && (
            <span className={styles.char}>Тип: {item.chars.type}</span>
          )}
          {item.chars.vendor && (
            <span className={styles.char}>
              Производитель: {item.chars.vendor}
            </span>
          )}
          {item.chars.density && (
            <span className={styles.char}>Плотность: {item.chars.density}</span>
          )}
          {item.chars.alcohol && (
            <span className={styles.char}>Алкоголь: {item.chars.alcohol}</span>
          )}
          {item.chars.test_string && (
            <span className={styles.char}>Тест: {item.chars.test_string}</span>
          )}
        </div>

        <div className={styles.priceContainer}>
          <span className={styles.price}>{item.price}</span>
          {item.rating && (
            <span className={styles.rating}>★ {item.rating}</span>
          )}
        </div>
      </div>
    </Link>
  );
};
