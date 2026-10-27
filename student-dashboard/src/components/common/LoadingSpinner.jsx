import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading data...', size = 32 }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      gap: '14px',
      color: 'var(--text-muted)'
    }}>
      <Loader2 size={size} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{message}</span>
    </div>
  );
}
