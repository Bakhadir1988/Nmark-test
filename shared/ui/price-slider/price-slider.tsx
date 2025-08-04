'use client';

import * as Slider from '@radix-ui/react-slider';
import React, { useEffect, useRef, useState } from 'react';

import styles from './price-slider.module.css';

export const PriceSlider: React.FC<{
  minPrice: number;
  maxPrice: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label?: string;
  currency?: string;
  debounceDelay?: number;
}> = ({
  minPrice,
  maxPrice,
  value,
  onChange,
  label = 'Цена',
  currency = '₽',
  debounceDelay = 100,
}) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    if (newValue.length < 2) return;

    setLocalValue([newValue[0], newValue[1]]);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onChange([newValue[0], newValue[1]]);
    }, debounceDelay);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label className={styles.label}>{label}</label>
        <span className={styles.value}>
          {localValue[0].toLocaleString()} - {localValue[1].toLocaleString()}{' '}
          {currency}
        </span>
      </div>
      <div className={styles.sliderContainer}>
        <Slider.Root
          className={styles.sliderRoot}
          value={localValue}
          onValueChange={handleValueChange}
          max={maxPrice}
          min={minPrice}
          step={1}
          minStepsBetweenThumbs={1}
        >
          <Slider.Track className={styles.sliderTrack}>
            <Slider.Range className={styles.sliderRange} />
          </Slider.Track>
          <Slider.Thumb className={styles.sliderThumb} />
          <Slider.Thumb className={styles.sliderThumb} />
        </Slider.Root>
      </div>
      <div className={styles.range}>
        <span className={styles.rangeMin}>
          {minPrice.toLocaleString()} {currency}
        </span>
        <span className={styles.rangeMax}>
          {maxPrice.toLocaleString()} {currency}
        </span>
      </div>
    </div>
  );
};
