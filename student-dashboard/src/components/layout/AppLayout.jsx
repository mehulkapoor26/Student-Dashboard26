import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../common/Button';

export default function AppLayout() {
  const { currentUser, logout } = useAuth();
  const { showInfo } = useToast();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    showInfo('Signed out of portal session.');
    navigate('/login');
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation with NavLinks */}
      <Sidebar />

      {/* Main Content Layout */}
      <div className="main-wrapper">
        <Header onLogout={() => setShowLogoutModal(true)} />

        <main className="content-area">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="dashboard-card" style={{ width: '400px', textAlign: 'center', padding: '28px' }}>
            <h3 className="heading-md" style={{ marginBottom: '12px' }}>Confirm Sign Out</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '24px', lineHeight: 1.5 }}>
              Are you sure you want to end your active session on Academix Student Portal, <strong>{currentUser?.name}</strong>?
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleConfirmLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
