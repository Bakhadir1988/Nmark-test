"use client";

import React from "react";
import "./input.module.css";

export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  label?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  id?: string;
  name?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  error,
  required = false,
  min,
  max,
  step,
  className = "",
  id,
  name,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`input-container ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
        className={`input ${error ? "input--error" : ""} ${
          disabled ? "input--disabled" : ""
        }`}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};
