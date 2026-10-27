import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Reusable TextArea Component with validation, error states, and character counter.
 */
export default function TextAreaField({
  id,
  name,
  label,
  rows = 4,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  disabled = false,
  maxLength,
  helperText,
  style = {},
  ...props
}) {
  const hasError = touched && Boolean(error);
  const currentLength = (value || '').length;

  return (
    <div className="form-field-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', width: '100%', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {label && (
          <label
            htmlFor={id || name}
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: hasError ? '#ef4444' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{label}</span>
            {required && <span style={{ color: '#ef4444' }}>*</span>}
          </label>
        )}
        {maxLength && (
          <span style={{ fontSize: '0.75rem', color: currentLength > maxLength ? '#ef4444' : 'var(--text-muted)' }}>
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      <div
        className="form-input-container"
        style={{
          display: 'flex',
          backgroundColor: disabled ? 'var(--bg-subtle)' : 'var(--bg-card)',
          border: `1.5px solid ${hasError ? '#ef4444' : 'var(--border-color)'}`,
          borderRadius: '8px',
          padding: '8px 12px',
          transition: 'all 0.2s ease',
          boxShadow: hasError ? '0 0 0 2px rgba(239, 68, 68, 0.15)' : 'none'
        }}
      >
        <textarea
          id={id || name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          maxLength={maxLength}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            resize: 'vertical',
            fontSize: '0.9rem',
            color: 'var(--text-main)',
            fontFamily: 'inherit',
            lineHeight: 1.5,
            width: '100%'
          }}
          {...props}
        />
      </div>

      {hasError ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ef4444', fontSize: '0.78rem', marginTop: '2px' }}>
          <AlertCircle size={13} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
