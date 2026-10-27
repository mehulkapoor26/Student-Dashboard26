import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorAlert({
  title = 'Failed to load data',
  message = 'An unexpected network error occurred while communicating with the campus server.',
  onRetry
}) {
  return (
    <div style={{
      backgroundColor: 'rgba(239, 68, 68, 0.08)',
      border: '1.5px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      margin: '16px 0'
    }}>
      <div style={{
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        color: '#ef4444',
        padding: '10px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <AlertTriangle size={24} />
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#ef4444' }}>
          {title}
        </h4>
        <p style={{ margin: '6px 0 14px 0', fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} /> Retry Request
          </button>
        )}
      </div>
    </div>
  );
}
