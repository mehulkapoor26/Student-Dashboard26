import React from 'react';
import { 
  LayoutGrid, 
  User, 
  BarChart3, 
  Calendar, 
  Bell, 
  Folder, 
  BookOpen, 
  CreditCard, 
  Home, 
  Trophy, 
  Settings,
  ShieldAlert
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'my-info', label: 'My Info', icon: User },
    { id: 'attendance', label: 'Attendance Ledger', icon: BarChart3 },
    { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
    { id: 'updates', label: 'Updates', icon: Bell },
    { id: 'notes', label: 'Notes', icon: Folder },
    { id: 'library', label: 'Library Terminal', icon: BookOpen },
    { id: 'fee', label: 'Fee', icon: CreditCard },
    { id: 'performance', label: 'Performance', icon: Trophy },
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, tracking: '1px', color: '#ffffff', lineHeight: 1 }}>
            APEX
          </h2>
          <span style={{ fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>
            UNIVERSITY
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.925rem',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
              }}
            >
              <Icon size={20} style={{ opacity: isActive ? 1 : 0.7 }} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings Bottom section */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--sidebar-border)' }}>
        <button
          onClick={() => setActiveTab('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 16px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: activeTab === 'settings' ? 'var(--sidebar-active-bg)' : 'transparent',
            color: activeTab === 'settings' ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
            fontWeight: activeTab === 'settings' ? 700 : 500,
            fontSize: '0.925rem',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%'
          }}
        >
          <Settings size={20} style={{ opacity: activeTab === 'settings' ? 1 : 0.7 }} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
