import React from 'react';
import { Palette, LogOut, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../common/Button';

export default function SettingsView({ onLogout: propLogout }) {
  const { theme, setTheme, themes } = useTheme();
  const { currentUser, logout } = useAuth();
  const { showSuccess } = useToast();

  const themeDescriptions = {
    light: 'Crisp, bright daylight theme with clear high-contrast typography.',
    dark: 'Sleek dark obsidian layout with glowing blue accents for reduced eye strain.',
    neon: 'High-contrast cyberpunk neon palette with luminous magenta and cyan glows.',
    emerald: 'Soothing emerald forest theme with earthy greens and mint highlights.',
    sunset: 'Rich dusky twilight palette with sunset amber and violet gradients.'
  };

  const handleSelectTheme = (themeId) => {
    setTheme(themeId);
    showSuccess(`Applied ${themeId.toUpperCase()} theme!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Theme Selection Engine (Context API Demo) */}
      <div className="dashboard-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary)', fontWeight: 700 }}>
            ⚡ Global State via ThemeContext
          </span>
        </div>
        <h2 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0 6px 0' }}>
          <Palette style={{ color: 'var(--primary)' }} /> Portal Theme &amp; Visual Appearance
        </h2>
        <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '24px' }}>
          Choose your interface palette. State is preserved across reloads via Context API and localStorage.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {themes.map((t) => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => handleSelectTheme(t.id)}
                style={{
                  padding: '18px',
                  borderRadius: '12px',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
                    {t.name}
                  </h3>
                </div>

                <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.4, margin: 0 }}>
                  {themeDescriptions[t.id] || 'Custom theme palette for Academix Portal.'}
                </p>

                {isSelected && (
                  <span className="badge" style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff'
                  }}>
                    Active
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Account Session & Security */}
      <div className="dashboard-card">
        <h3 className="heading-md" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={20} style={{ color: '#ef4444' }} /> Account Session &amp; Security
        </h3>
        <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '20px' }}>
          Logged in as <strong>{currentUser?.name}</strong> ({currentUser?.email})
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'var(--bg-subtle)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
              End Active Session
            </h4>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>
              Sign out from your university portal account on this device.
            </span>
          </div>

          <Button
            variant="danger"
            icon={LogOut}
            onClick={propLogout || logout}
          >
            Log Out
          </Button>
        </div>
      </div>

    </div>
  );
}
