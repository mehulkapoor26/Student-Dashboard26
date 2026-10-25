import React from 'react';
import { Palette, LogOut, ShieldAlert } from 'lucide-react';

export default function SettingsView({ theme, setTheme, onLogout }) {
  const themeOptions = [
    { id: 'light', name: 'Normal (Light Mode)', icon: '☀️', desc: 'Clean, crisp white and slate layout with high clarity' },
    { id: 'dark', name: 'Dark Mode', icon: '🌙', desc: 'Sleek dark obsidian layout with glowing blue accents for reduced eye strain' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Theme Selection Engine */}
      <div className="dashboard-card">
        <h2 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <Palette style={{ color: 'var(--primary)' }} /> Portal Theme & Visual Appearance
        </h2>
        <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '24px' }}>
          Customize your dashboard visual interface with light and dark mode themes.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {themeOptions.map(t => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                style={{
                  flex: '1 1 300px',
                  padding: '20px',
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
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)' }}>{t.name}</h3>
                </div>

                <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                  {t.desc}
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
          <ShieldAlert size={20} style={{ color: '#ef4444' }} /> Account Session & Security
        </h3>
        <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '20px' }}>
          Manage your active student session or safely log out of Academix Student Portal.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'var(--bg-subtle)', borderRadius: '12px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
              End Active Session
            </h4>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>
              Sign out from your university portal account on this device.
            </span>
          </div>

          <button 
            onClick={onLogout}
            className="btn-primary"
            style={{ 
              backgroundColor: '#ef4444', 
              borderColor: '#ef4444',
              padding: '10px 20px', 
              fontSize: '0.875rem',
              fontWeight: 700,
              gap: '8px'
            }}
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>

    </div>
  );
}
