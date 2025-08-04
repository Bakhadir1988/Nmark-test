'use client';

import React from 'react';

import styles from './checkbox.module.css';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  name,
  size = 'medium',
  variant = 'default',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(!checked);
    }
  };

  const sizeClasses = {
    small: 'checkbox--small',
    medium: 'checkbox--medium',
    large: 'checkbox--large',
  };

  const variantClasses = {
    default: 'checkbox--default',
    primary: 'checkbox--primary',
    success: 'checkbox--success',
    warning: 'checkbox--warning',
    error: 'checkbox--error',
  };

  return (
    <label
      className={`${styles.checkbox} ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? 'checkbox--disabled' : ''
      }`}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        id={id}
        name={name}
        className="checkbox__input"
      />
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
};
