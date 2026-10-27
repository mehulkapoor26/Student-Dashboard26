import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Reusable Form Input Component with built-in validation states,
 * error messages, helper text, and icon accessories.
 */
export default function InputField({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  disabled = false,
  icon: Icon,
  rightAction,
  helperText,
  style = {},
  autoComplete,
  ...props
}) {
  const hasError = touched && Boolean(error);

  return (
    <div className="form-field-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', width: '100%', ...style }}>
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

      <div
        className="form-input-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: disabled ? 'var(--bg-subtle)' : 'var(--bg-card)',
          border: `1.5px solid ${hasError ? '#ef4444' : 'var(--border-color)'}`,
          borderRadius: '8px',
          padding: '0 12px',
          transition: 'all 0.2s ease',
          boxShadow: hasError ? '0 0 0 2px rgba(239, 68, 68, 0.15)' : 'none'
        }}
      >
        {Icon && (
          <span style={{ color: hasError ? '#ef4444' : 'var(--text-muted)', display: 'flex', marginRight: '8px', flexShrink: 0 }}>
            <Icon size={18} />
          </span>
        )}

        <input
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={autoComplete}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            padding: '10px 0',
            fontSize: '0.9rem',
            color: 'var(--text-main)',
            width: '100%'
          }}
          {...props}
        />

        {rightAction && (
          <div style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}>
            {rightAction}
          </div>
        )}
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
