import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Palette, LogOut, Bell, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { selectCartCount } from '../store/cartSlice';

export default function Header({ onLogout }) {
  const { currentUser } = useAuth();
  const { theme, setTheme, themes } = useTheme();
  const cartCount = useSelector(selectCartCount);

  const studentName = currentUser?.name || 'Student';
  const initialLetter = studentName.charAt(0).toUpperCase();
  const deptLabel = currentUser?.department ? `Student • ${currentUser.department}` : 'Student • CSE Dept';

  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <span style={{
            background: 'linear-gradient(135deg, var(--primary), var(--accent-pink))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.5rem',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            Student Dashboard
          </span>
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Theme Switcher Selector from ThemeContext */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-subtle)', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <Palette size={16} style={{ color: 'var(--primary)' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Theme:</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {themes.map((t) => (
              <option key={t.id} value={t.id} style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>
                {t.icon} {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cart Quick Button (Redux State) */}
        <Link
          to="/store"
          style={{
            position: 'relative',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            textDecoration: 'none'
          }}
          title="Campus Store & Cart (Redux)"
        >
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 800,
              borderRadius: '50%',
              minWidth: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 2px'
            }}>
              {cartCount}
            </span>
          )}
        </Link>

        {/* Notifications trigger */}
        <Link
          to="/updates"
          style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            position: 'relative',
            textDecoration: 'none'
          }}
          title="Circulars & Updates"
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--accent-pink)',
            borderRadius: '50%'
          }} />
        </Link>

        {/* Student Avatar Card linking to /my-info */}
        <Link
          to="/my-info"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'var(--bg-sidebar)',
            color: 'var(--sidebar-text)',
            padding: '6px 14px 6px 8px',
            borderRadius: '30px',
            border: '1px solid var(--sidebar-border)',
            textDecoration: 'none'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            {initialLetter}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, lineHeight: 1.2 }}>{studentName}</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.8, maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {deptLabel}
            </span>
          </div>
        </Link>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          style={{
            backgroundColor: '#fff0f0',
            color: '#ef4444',
            border: '1px solid #fca5a5',
            padding: '6px 14px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </header>
  );
}
