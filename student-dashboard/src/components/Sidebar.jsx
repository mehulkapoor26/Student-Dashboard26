import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../store/cartSlice';
import {
  LayoutGrid,
  User,
  BarChart3,
  Calendar,
  Bell,
  Folder,
  BookOpen,
  CreditCard,
  Trophy,
  Settings,
  ShoppingBag,
  Briefcase,
  Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const cartCount = useSelector(selectCartCount);

  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { to: '/my-info', label: 'My Info', icon: User },
    { to: '/attendance', label: 'Attendance Ledger', icon: BarChart3 },
    { to: '/calendar', label: 'Academic Calendar', icon: Calendar },
    { to: '/updates', label: 'Updates & Notices', icon: Bell },
    { to: '/notes', label: 'Notes', icon: Folder },
    { to: '/library', label: 'Library Terminal', icon: BookOpen },
    { to: '/fee', label: 'Fee Payments', icon: CreditCard },
    { to: '/performance', label: 'Performance', icon: Trophy },
    // Syllabus Mini Projects
    { to: '/portfolio', label: 'Student Portfolio', icon: Briefcase, badge: 'Syllabus' },
    { to: '/store', label: 'Campus Store', icon: ShoppingBag, count: cartCount, badge: 'Redux' }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div style={{
        padding: '24px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid var(--sidebar-border)'
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 900,
          fontSize: '1.4rem',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
        }}>
          AU
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, tracking: '1px', color: '#ffffff', lineHeight: 1, margin: 0 }}>
            APEX
          </h2>
          <span style={{ fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>
            UNIVERSITY
          </span>
        </div>
      </div>

      {/* Navigation List using React Router NavLink */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                borderRadius: '10px',
                textDecoration: 'none',
                backgroundColor: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.885rem',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
              })}
            >
              {({ isActive }) => (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={19} style={{ opacity: isActive ? 1 : 0.75, flexShrink: 0 }} />
                    <span>{item.label}</span>
                  </div>

                  {item.count > 0 && (
                    <span style={{
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: '10px'
                    }}>
                      {item.count}
                    </span>
                  )}

                  {!item.count && item.badge && (
                    <span style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(139, 92, 246, 0.25)',
                      color: isActive ? '#ffffff' : '#c084fc',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings Bottom section */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--sidebar-border)' }}>
        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '11px 14px',
            borderRadius: '10px',
            textDecoration: 'none',
            backgroundColor: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
            color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
            fontWeight: isActive ? 700 : 500,
            fontSize: '0.885rem',
            transition: 'all 0.2s ease'
          })}
        >
          {({ isActive }) => (
            <>
              <Settings size={19} style={{ opacity: isActive ? 1 : 0.75 }} />
              <span>Settings</span>
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
}
