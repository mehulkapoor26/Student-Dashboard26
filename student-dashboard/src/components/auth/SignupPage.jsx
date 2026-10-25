import React, { useState } from 'react';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, Hash, BookOpen, AlertCircle, ArrowLeft, Palette, CheckCircle2, ShieldCheck } from 'lucide-react';
import { registerStudent, isValidUniversityEmail } from './authStorage';

export default function SignupPage({ onSignupSuccess, onSwitchToLogin, theme, setTheme }) {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    department: 'School of Computer Science & Tech',
    program: 'B.Tech in Artificial Intelligence & Machine Learning',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const programs = [
    { name: 'B.Tech in Artificial Intelligence & Machine Learning', dept: 'School of Computer Science & Tech' },
    { name: 'B.Tech in Computer Science & Engineering', dept: 'School of Computer Science & Tech' },
    { name: 'B.Tech in Data Science & Big Data Analytics', dept: 'School of Computing & Informatics' },
    { name: 'B.Tech in Electronics & Communication', dept: 'School of Electrical & Electronics' },
    { name: 'B.Tech in Mechanical & Robotics Engineering', dept: 'School of Mechanical Sciences' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      // If program changes, auto-select corresponding department
      if (name === 'program') {
        const found = programs.find(p => p.name === value);
        if (found) {
          updated.department = found.dept;
        }
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full legal name.');
      return;
    }
    if (!formData.rollNumber.trim()) {
      setErrorMessage('Please enter your Student Roll Number or Enrollment ID.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid university email address.');
      return;
    }
    if (!isValidUniversityEmail(formData.email)) {
      setErrorMessage('Invalid email domain. Only official university email addresses ending with @apex.edu are allowed. Personal emails like Gmail are not permitted.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }
    if (!formData.agreeTerms) {
      setErrorMessage('You must accept the Apex University Academic Honor Code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const newStudent = registerStudent({
          name: formData.name.trim(),
          rollNumber: formData.rollNumber.trim(),
          email: formData.email.trim(),
          department: formData.department,
          program: formData.program,
          password: formData.password.trim(),
          section: 'U25-' + formData.rollNumber.trim().slice(-2) || 'U25-A1',
          mentor: 'Dr. S. K. Narayan'
        });

        onSignupSuccess(newStudent);
      } catch (err) {
        setErrorMessage(err.message || 'Failed to register account.');
      } finally {
        setIsLoading(false);
      }
    }, 450);
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

      {/* Top Floating Bar */}
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

      <div className="auth-card-container" style={{ maxWidth: '540px' }}>
        <div className="dashboard-card auth-card">
          {/* Header Brand */}
          <div className="auth-header">
            <div className="auth-logo-badge">
              <span>AU</span>
            </div>
            <h2 className="heading-lg" style={{ marginTop: '12px', marginBottom: '4px' }}>
              Student Registration
            </h2>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>
              Create your official Apex University Portal Account
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="auth-alert-error">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Name and Roll in two columns */}
            <div className="auth-grid-2">
              <div className="auth-input-group">
                <label htmlFor="name">Full Name</label>
                <div className="auth-input-wrapper">
                  <User size={18} className="auth-input-icon" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="rollNumber">Roll / Enrollment No.</label>
                <div className="auth-input-wrapper">
                  <Hash size={18} className="auth-input-icon" />
                  <input
                    id="rollNumber"
                    name="rollNumber"
                    type="text"
                    placeholder="e.g. 25108892"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="auth-input-group">
              <label htmlFor="email">University / Official Email</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. priya.sharma@apex.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Academic Program */}
            <div className="auth-input-group">
              <label htmlFor="program">Degree & Major</label>
              <div className="auth-input-wrapper">
                <BookOpen size={18} className="auth-input-icon" />
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="auth-select"
                >
                  {programs.map(p => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Passwords in two columns */}
            <div className="auth-grid-2">
              <div className="auth-input-group">
                <label htmlFor="signup-password">Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-eye-btn"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="auth-eye-btn"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <div style={{ marginTop: '2px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  style={{ accentColor: 'var(--primary)', marginTop: '2px', cursor: 'pointer' }}
                />
                <span>
                  I agree to the <strong>Apex University Academic Honor Code</strong> and agree to abide by portal terms.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary auth-submit-btn"
              style={{ marginTop: '10px' }}
            >
              {isLoading ? (
                <span>Registering student profile...</span>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Create Student Account</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Switcher */}
          <div className="auth-card-footer">
            <span className="text-muted" style={{ fontSize: '0.875rem' }}>
              Already registered your student account?
            </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="auth-switch-link"
            >
              <ArrowLeft size={15} />
              <span>Back to Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

