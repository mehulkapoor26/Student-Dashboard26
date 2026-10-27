import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import Button from '../common/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      padding: '24px',
      gap: '20px'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: '#ef4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AlertCircle size={48} />
      </div>

      <div style={{ maxWidth: '460px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-heading)', margin: '0 0 8px 0', lineHeight: 1 }}>
          404
        </h1>
        <h2 className="heading-md" style={{ marginBottom: '8px' }}>
          Page or Route Not Found
        </h2>
        <p className="text-muted" style={{ fontSize: '0.925rem', lineHeight: 1.5, margin: 0 }}>
          The requested SPA URL path does not exist in Academix Student Portal. Please check the route navigation.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Button
          variant="primary"
          icon={Home}
          onClick={() => navigate('/dashboard')}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
