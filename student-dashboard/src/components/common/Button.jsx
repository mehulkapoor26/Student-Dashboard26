import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button Component adhering to Front End Engineering II standards.
 * Supports variants (primary, secondary, danger, outline), loading state, and icons.
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  style = {},
  ...props
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'var(--bg-subtle)',
          color: 'var(--text-main)',
          border: '1px solid var(--border-color)',
        };
      case 'danger':
        return {
          backgroundColor: '#ef4444',
          color: '#ffffff',
          border: '1px solid transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--primary)',
          border: '1.5px solid var(--primary)',
        };
      case 'success':
        return {
          backgroundColor: 'var(--accent-green)',
          color: '#ffffff',
          border: '1px solid transparent',
        };
      case 'primary':
      default:
        return {
          backgroundColor: 'var(--primary)',
          color: '#ffffff',
          border: '1px solid transparent',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px' };
      case 'lg':
        return { padding: '12px 24px', fontSize: '1rem', borderRadius: '10px' };
      case 'md':
      default:
        return { padding: '9px 18px', fontSize: '0.875rem', borderRadius: '8px' };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 600,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: variant === 'primary' ? '0 2px 8px rgba(37, 99, 235, 0.2)' : 'none',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      className={`reusable-btn ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={16} className="btn-spinner" style={{ animation: 'spin 1s linear infinite' }} />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={16} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={16} />}
        </>
      )}
    </button>
  );
}
