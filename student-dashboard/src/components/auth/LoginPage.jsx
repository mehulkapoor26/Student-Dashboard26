import React, { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Palette, ArrowRight, ShieldCheck } from 'lucide-react';
import { authenticateStudent, isValidUniversityEmail } from './authStorage';

export default function LoginPage({ onLoginSuccess, onSwitchToSignup, theme, setTheme }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const [forgotError, setForgotError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your University Email or Roll Number.');
      return;
    }

    if (identifier.includes('@') && !isValidUniversityEmail(identifier)) {
      setErrorMessage('Invalid email domain. Only official university email addresses ending with @apex.edu are allowed (Gmail is not accepted).');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const user = authenticateStudent(identifier, password);
        onLoginSuccess(user);
      } catch (err) {
        setErrorMessage(err.message || 'Authentication failed.');
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setForgotError('');
    if (!forgotEmail.trim()) {
      setForgotError('Please enter your University Email address.');
      return;
    }
    if (!isValidUniversityEmail(forgotEmail)) {
      setForgotError('Only official university email addresses ending with @apex.edu are permitted.');
      return;
    }
    setForgotSuccess(true);
  };

  const themes = [
    { id: 'light', name: 'Light' },
    { id: 'dark', name: 'Dark' },
    { id: 'neon', name: 'Neon' },
    { id: 'emerald', name: 'Emerald' },
    { id: 'sunset', name: 'Sunset' }
  ];

  return (
    <div className="auth-wrapper">
      {/* Background Decorative Glows */}
      <div className="auth-bg-blob auth-blob-1" />
      <div className="auth-bg-blob auth-blob-2" />

      {/* Top Floating Bar for Theme Selection */}
      <div className="auth-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Palette size={16} style={{ color: 'var(--primary)' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Theme:</span>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            className="auth-theme-select"
          >
            {themes.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="auth-card-container">
        <div className="dashboard-card auth-card">
          {/* Header Brand */}
          <div className="auth-header">
            <div className="auth-logo-badge">
              <span>AU</span>
            </div>
            <h2 className="heading-lg" style={{ marginTop: '12px', marginBottom: '4px' }}>
              Welcome Back
            </h2>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>
              Apex University • Academix Student Portal
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="auth-alert-error">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <label htmlFor="identifier">Student Email or Roll Number</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  id="identifier"
                  type="text"
                  placeholder="e.g. rohit.verma@apex.edu or 25109928"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label htmlFor="password" style={{ margin: 0 }}>Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPasswordModal(true);
                    setForgotSuccess(false);
                    setForgotEmail(identifier.includes('@') ? identifier : '');
                  }}
                  className="auth-link-btn"
                >
                  Forgot password?
                </button>
              </div>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-eye-btn"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                Remember my session
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary auth-submit-btn"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In to Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Switcher */}
          <div className="auth-card-footer">
            <span className="text-muted" style={{ fontSize: '0.875rem' }}>
              Don't have a student account?
            </span>
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="auth-switch-link"
            >
              <span>Register Now</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="auth-modal-overlay">
          <div className="dashboard-card auth-modal-card">
            <h3 className="heading-md" style={{ marginBottom: '8px' }}>Reset Student Password</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
              Enter your registered Apex University email address to receive password reset instructions.
            </p>

            {forgotError && (
              <div className="auth-alert-error" style={{ marginBottom: '14px' }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotSuccess ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle2 size={42} style={{ color: 'var(--accent-green)', margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)' }}>Reset Link Sent!</h4>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '6px' }}>
                  If an account exists for <strong>{forgotEmail}</strong>, instructions to reset your password have been sent to your university inbox.
                </p>
                <button
                  className="btn-primary"
                  style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
                  onClick={() => setShowForgotPasswordModal(false)}
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit}>
                <div className="auth-input-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="reset-email">University Email</label>
                  <div className="auth-input-wrapper">
                    <Mail size={18} className="auth-input-icon" />
                    <input
                      id="reset-email"
                      type="email"
                      placeholder="student@apex.edu"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowForgotPasswordModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

