import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import MyInfoView from './components/views/MyInfoView';
import AttendanceView from './components/views/AttendanceView';
import CalendarView from './components/views/CalendarView';
import UpdatesView from './components/views/UpdatesView';
import NotesView from './components/views/NotesView';
import LibraryView from './components/views/LibraryView';
import FeeView from './components/views/FeeView';
import PerformanceView from './components/views/PerformanceView';
import SettingsView from './components/views/SettingsView';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import { getActiveSession, setActiveSession, updateStudentProfile } from './components/auth/authStorage';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [currentUser, setCurrentUser] = useState(() => getActiveSession());
  const [authPage, setAuthPage] = useState('login'); // 'login' | 'signup'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Sync theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLoginSuccess = (user) => {
    setActiveSession(user);
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleSignupSuccess = (user) => {
    setActiveSession(user);
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleUpdateUser = (updated) => {
    const saved = updateStudentProfile(updated);
    setCurrentUser(saved);
  };

  const handleConfirmLogout = () => {
    setActiveSession(null);
    setCurrentUser(null);
    setShowLogoutModal(false);
    setAuthPage('login');
  };

  // If student is not logged in, render Login or Signup page
  if (!currentUser) {
    if (authPage === 'signup') {
      return (
        <SignupPage 
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={() => setAuthPage('login')}
          theme={theme}
          setTheme={setTheme}
        />
      );
    }
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={() => setAuthPage('signup')}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'my-info':
        return <MyInfoView currentUser={currentUser} onUpdateUser={handleUpdateUser} />;
      case 'attendance':
        return <AttendanceView />;
      case 'calendar':
        return <CalendarView />;
      case 'updates':
        return <UpdatesView />;
      case 'notes':
        return <NotesView />;
      case 'library':
        return <LibraryView />;
      case 'fee':
        return <FeeView />;
      case 'performance':
        return <PerformanceView />;
      case 'settings':
        return <SettingsView theme={theme} setTheme={setTheme} onLogout={() => setShowLogoutModal(true)} />;
      default:
        return <DashboardView setActiveTab={setActiveTab} currentUser={currentUser} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Layout */}
      <div className="main-wrapper">
        <Header 
          theme={theme} 
          setTheme={setTheme} 
          activeTab={activeTab}
          currentUser={currentUser}
          onLogout={() => setShowLogoutModal(true)} 
        />

        <main className="content-area">
          {renderActiveView()}
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
          zIndex: 100
        }}>
          <div className="dashboard-card" style={{ width: '400px', textAlign: 'center' }}>
            <h3 className="heading-md" style={{ marginBottom: '12px' }}>Confirm Sign Out</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '20px' }}>
              Are you sure you want to end your active session on Academix Student Portal, <strong>{currentUser.name}</strong>?
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                style={{ backgroundColor: '#ef4444' }}
                onClick={handleConfirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

