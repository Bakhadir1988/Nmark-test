import React, { useCallback, useEffect, useState } from 'react';

import { FilterPropType } from '@/features/product-filter/model/types';
import { Checkbox } from '@/shared/ui/checkbox';
import { PriceSlider } from '@/shared/ui/price-slider';

import styles from './filter-item.module.css';

interface FilterItemProps {
  prop: FilterPropType;
  onFilterChange?: (filters: {
    [key: string]: string | number | boolean | string[] | null;
  }) => void;
  currentFilters?: {
    [key: string]: string | number | boolean | string[] | null;
  };
}

export const FilterItem: React.FC<FilterItemProps> = ({
  prop,
  onFilterChange,
  currentFilters,
}) => {
  // Инициализируем состояние из currentFilters
  const getInitialSelectedValues = (): string[] => {
    if (!currentFilters || !currentFilters[prop.prop_id]) {
      return [];
    }
    const value = currentFilters[prop.prop_id];
    if (value === null || value === undefined) {
      return [];
    }
    return Array.isArray(value) ? value : [];
  };

  const [selectedValues, setSelectedValues] = useState<string[]>(
    getInitialSelectedValues(),
  );

  // Обновляем состояние при изменении currentFilters
  useEffect(() => {
    setSelectedValues(getInitialSelectedValues());
  }, [currentFilters, prop.prop_id]);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    let newSelectedValues: string[];

    if (checked) {
      newSelectedValues = [...selectedValues, value];
    } else {
      newSelectedValues = selectedValues.filter((v) => v !== value);
    }

    setSelectedValues(newSelectedValues);

    if (newSelectedValues.length > 0) {
      onFilterChange?.({ [prop.prop_id]: newSelectedValues });
    } else {
      onFilterChange?.({ [prop.prop_id]: null });
    }
  };

  const handleReset = () => {
    setSelectedValues([]);
    onFilterChange?.({ [prop.prop_id]: null });
  };

  // === Ценовой фильтр ===
  if (prop.type === 'PRICE') {
    const priceFilter = prop.filter as {
      min: string;
      max: string;
      lt: string | null;
      gt: string | null;
      actual_min: string;
      actual_max: string;
    };

    const minPrice = parseFloat(priceFilter.min) || 0;
    const maxPrice = parseFloat(priceFilter.max) || 100;

    // Получаем текущие значения из фильтров
    const currentMinKey = `${prop.prop_id}_min`;
    const currentMaxKey = `${prop.prop_id}_max`;
    const currentMinFromFilters = currentFilters?.[currentMinKey];
    const currentMaxFromFilters = currentFilters?.[currentMaxKey];

    // Определяем текущие значения слайдера
    const currentMin =
      currentMinFromFilters !== null && currentMinFromFilters !== undefined
        ? Number(currentMinFromFilters)
        : minPrice;
    const currentMax =
      currentMaxFromFilters !== null && currentMaxFromFilters !== undefined
        ? Number(currentMaxFromFilters)
        : maxPrice;

    // Проверяем активные фильтры
    const hasActivePriceFilters =
      currentMinFromFilters !== null || currentMaxFromFilters !== null;

    const handlePriceChange = (value: [number, number]) => {
      onFilterChange?.({
        [`${prop.prop_id}_min`]: value[0],
        [`${prop.prop_id}_max`]: value[1],
      });
    };

    const handlePriceReset = () => {
      // Немедленно отправляем исходные значения для сброса
      onFilterChange?.({
        [`${prop.prop_id}_min`]: minPrice,
        [`${prop.prop_id}_max`]: maxPrice,
      });

      // Затем удаляем фильтры
      setTimeout(() => {
        onFilterChange?.({
          [`${prop.prop_id}_min`]: null,
          [`${prop.prop_id}_max`]: null,
        });
      }, 50);
    };

    return (
      <div className={styles.filterItem}>
        <div className={styles.priceContainer}>
          <div className={styles.header}>
            <h3>{prop.title}</h3>
            {hasActivePriceFilters && (
              <button
                type="button"
                className={styles.resetButton}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePriceReset();
                }}
              >
                X
              </button>
            )}
          </div>
          <PriceSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            value={[currentMin, currentMax]}
            onChange={handlePriceChange}
            label={prop.title}
            currency="₽"
            debounceDelay={300}
          />
        </div>
      </div>
    );
  }

  // === ENUM или STRING фильтр ===
  if (prop.type === 'ENUM' || prop.type === 'STRING') {
    const enumFilter = prop.filter as {
      [key: string]: { label: string; total_count: string };
    };

    return (
      <div className={styles.filterItem}>
        <div className={styles.header}>
          <h3>{prop.title}</h3>
          {selectedValues.length > 0 && (
            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
            >
              X
            </button>
          )}
        </div>
        <div className={styles.checkboxGroup}>
          {Object.entries(enumFilter).map(([key, value]) => (
            <div key={key} className={styles.checkboxItem}>
              <Checkbox
                label={value.label}
                checked={selectedValues.includes(key)}
                onChange={(checked) => handleCheckboxChange(key, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // === Неизвестный тип ===
  return <div className={styles.filterItem}>Неизвестный тип: {prop.title}</div>;
};
