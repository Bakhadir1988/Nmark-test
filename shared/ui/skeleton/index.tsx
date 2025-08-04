import React from 'react';

import styles from './skeleton.module.css';

// Скелетон для чекбокс фильтра
export const CheckboxFilterSkeleton: React.FC = () => {
  return (
    <div className={styles.filterSkeleton}>
      <div className={styles.filterHeader}>
        <div className={styles.filterTitle}></div>
        <div className={styles.resetButton}></div>
      </div>
      <div className={styles.filterContent}>
        <div className={styles.checkboxGroup}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={styles.checkboxItem}>
              <div className={styles.checkbox}></div>
              <div className={styles.checkboxLabel}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Скелетон для ценового фильтра
export const PriceFilterSkeleton: React.FC = () => {
  return (
    <div className={styles.filterSkeleton}>
      <div className={styles.filterHeader}>
        <div className={styles.filterTitle}></div>
        <div className={styles.resetButton}></div>
      </div>
      <div className={styles.filterContent}>
        <div className={styles.priceSliderSkeleton}>
          <div className={styles.sliderTrack}></div>
          <div className={styles.sliderThumbs}>
            <div className={styles.sliderThumb}></div>
            <div className={styles.sliderThumb}></div>
          </div>
        </div>
        <div className={styles.priceRange}>
          <div className={styles.rangeMin}></div>
          <div className={styles.rangeMax}></div>
        </div>
      </div>
    </div>
  );
};

// Универсальный скелетон для фильтра (соответствует FilterItem)
export const FilterSkeleton: React.FC = () => {
  return <CheckboxFilterSkeleton />;
};

// Скелетон для списка фильтров с чередованием типов
export const FilterListSkeleton: React.FC<{ count?: number }> = ({
  count = 8,
}) => {
  return (
    <div className={styles.filterListSkeleton}>
      {Array.from({ length: count }).map((_, index) => {
        // Чередуем типы скелетонов для большей реалистичности
        const isPriceFilter = index % 3 === 0; // Каждый третий - ценовый фильтр
        return (
          <div key={index} className={styles.filterSkeleton}>
            <div className={styles.filterHeader}>
              <div className={styles.filterTitle}></div>
              <div className={styles.resetButton}></div>
            </div>
            <div className={styles.filterContent}>
              {isPriceFilter ? (
                // Ценовый фильтр
                <>
                  <div className={styles.priceSliderSkeleton}>
                    <div className={styles.sliderTrack}></div>
                    <div className={styles.sliderThumbs}>
                      <div className={styles.sliderThumb}></div>
                      <div className={styles.sliderThumb}></div>
                    </div>
                  </div>
                  <div className={styles.priceRange}>
                    <div className={styles.rangeMin}></div>
                    <div className={styles.rangeMax}></div>
                  </div>
                </>
              ) : (
                // Чекбокс фильтр
                <div className={styles.checkboxGroup}>
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className={styles.checkboxItem}>
                      <div className={styles.checkbox}></div>
                      <div className={styles.checkboxLabel}></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Скелетон для карточки товара с динамической высотой
export const ProductCardSkeleton: React.FC<{
  hasImage?: boolean;
  hasTitle?: boolean;
  charsCount?: number;
  hasPrice?: boolean;
  hasRating?: boolean;
}> = ({
  hasImage = true,
  hasTitle = true,
  charsCount = Math.floor(Math.random() * 4) + 2, // 2-5 характеристик
  hasPrice = true,
  hasRating = true,
}) => {
  return (
    <div className={styles.productCardSkeleton}>
      {hasImage && <div className={styles.productImage}></div>}
      <div className={styles.productContent}>
        {hasTitle && <div className={styles.productTitle}></div>}
        {charsCount > 0 && (
          <div className={styles.productChars}>
            {Array.from({ length: charsCount }).map((_, index) => (
              <div key={index} className={styles.charItem}></div>
            ))}
          </div>
        )}
        <div className={styles.productFooter}>
          {hasPrice && <div className={styles.productPrice}></div>}
          {hasRating && <div className={styles.productRating}></div>}
        </div>
      </div>
    </div>
  );
};

// Скелетон для списка товаров с разными вариантами
export const ProductListSkeleton: React.FC<{ count?: number }> = ({
  count = 6,
}) => {
  // Предопределенные варианты для стабильности
  const cardVariants = [
    {
      hasImage: true,
      hasTitle: true,
      charsCount: 3,
      hasPrice: true,
      hasRating: true,
    },
    {
      hasImage: true,
      hasTitle: true,
      charsCount: 2,
      hasPrice: true,
      hasRating: false,
    },
    {
      hasImage: true,
      hasTitle: true,
      charsCount: 4,
      hasPrice: true,
      hasRating: true,
    },
    {
      hasImage: false,
      hasTitle: true,
      charsCount: 2,
      hasPrice: true,
      hasRating: true,
    },
    {
      hasImage: true,
      hasTitle: true,
      charsCount: 1,
      hasPrice: true,
      hasRating: false,
    },
    {
      hasImage: true,
      hasTitle: true,
      charsCount: 3,
      hasPrice: false,
      hasRating: true,
    },
    {
      hasImage: true,
      hasTitle: false,
      charsCount: 2,
      hasPrice: true,
      hasRating: true,
    },
    {
      hasImage: true,
      hasTitle: true,
      charsCount: 4,
      hasPrice: true,
      hasRating: true,
    },
  ];

  return (
    <div className={styles.productListSkeleton}>
      {Array.from({ length: count }).map((_, index) => {
        // Используем предопределенные варианты для стабильности
        const variant = cardVariants[index % cardVariants.length];

        return (
          <ProductCardSkeleton
            key={index}
            hasImage={variant.hasImage}
            hasTitle={variant.hasTitle}
            charsCount={variant.charsCount}
            hasPrice={variant.hasPrice}
            hasRating={variant.hasRating}
          />
        );
      })}
    </div>
  );
};

// Скелетон для пагинации
export const PaginationSkeleton: React.FC<{ pageCount?: number }> = ({
  pageCount = 5,
}) => {
  return (
    <div className={styles.paginationSkeleton}>
      <div className={styles.paginationInfo}></div>
      <div className={styles.paginationButtons}>
        {Array.from({ length: pageCount }).map((_, index) => (
          <div key={index} className={styles.paginationButton}></div>
        ))}
      </div>
    </div>
  );
};
