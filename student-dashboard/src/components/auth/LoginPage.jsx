import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, Palette, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useForm } from '../../hooks/useForm';
import InputField from '../common/InputField';
import Button from '../common/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, setTheme, themes } = useTheme();
  const { showSuccess, showError } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formGlobalError, setFormGlobalError] = useState('');

  // Password Reset Modal State
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState('');

  // Form Handling with validation strategies
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm({
    initialValues: {
      identifier: 'rohit.verma@apex.edu',
      password: 'password123'
    },
    validationRules: {
      identifier: {
        required: true,
        label: 'University Email or Roll Number',
        validate: (val) => {
          if (val && val.includes('@') && !val.trim().toLowerCase().endsWith('@apex.edu') && !val.trim().toLowerCase().endsWith('@apex.edu.in')) {
            return 'Only official university email ending in @apex.edu allowed.';
          }
          return '';
        }
      },
      password: {
        required: true,
        minLength: 6,
        label: 'Password'
      }
    },
    onSubmit: async (formValues) => {
      setFormGlobalError('');
      try {
        const user = await login(formValues.identifier, formValues.password);
        showSuccess(`Welcome back, ${user.name}!`);
        navigate('/dashboard');
      } catch (err) {
        setFormGlobalError(err.message || 'Authentication failed. Please verify credentials.');
      }
    }
  });

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setForgotError('');
    if (!forgotEmail.trim()) {
      setForgotError('Please enter your University Email address.');
      return;
    }
    if (!forgotEmail.trim().toLowerCase().endsWith('@apex.edu')) {
      setForgotError('Only official university email addresses ending with @apex.edu are permitted.');
      return;
    }
    setForgotSuccess(true);
  };

  return (
    <div className="auth-wrapper">
      {/* Background Decorative Glows */}
      <div className="auth-bg-blob auth-blob-1" />
      <div className="auth-bg-blob auth-blob-2" />

      {/* Top Floating Bar for Theme Selection via ThemeContext */}
      <div className="auth-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Palette size={16} style={{ color: 'var(--primary)' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Theme:</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="auth-theme-select"
          >
            {themes.map((t) => (
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

          {/* Global Error Banner */}
          {formGlobalError && (
            <div className="auth-alert-error">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{formGlobalError}</span>
            </div>
          )}

          {/* Form with Reusable Components */}
          <form onSubmit={handleSubmit} className="auth-form">
            <InputField
              label="Student Email or Roll Number"
              name="identifier"
              placeholder="e.g. rohit.verma@apex.edu or 25109928"
              value={values.identifier}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.identifier}
              touched={touched.identifier}
              required
              icon={Mail}
              autoComplete="username"
            />

            <InputField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              required
              icon={Lock}
              autoComplete="current-password"
              rightAction={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-eye-btn"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              }
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-4px', marginBottom: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                Remember my session
              </label>

              <button
                type="button"
                onClick={() => {
                  setShowForgotPasswordModal(true);
                  setForgotSuccess(false);
                  setForgotEmail(values.identifier.includes('@') ? values.identifier : '');
                }}
                className="auth-link-btn"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              icon={LogIn}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Sign In to Portal
            </Button>
          </form>

          {/* Footer Switcher */}
          <div className="auth-card-footer">
            <span className="text-muted" style={{ fontSize: '0.875rem' }}>
              Don't have a student account?
            </span>
            <Link to="/signup" className="auth-switch-link">
              <span>Register Now</span>
              <ArrowRight size={15} />
            </Link>
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
