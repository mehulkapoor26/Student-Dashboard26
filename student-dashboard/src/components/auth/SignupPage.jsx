import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, Hash, BookOpen, AlertCircle, ArrowLeft, Palette } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useForm } from '../../hooks/useForm';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import Button from '../common/Button';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { theme, setTheme, themes } = useTheme();
  const { showSuccess } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formGlobalError, setFormGlobalError] = useState('');

  const programs = [
    { value: 'B.Tech in Artificial Intelligence & Machine Learning', label: 'B.Tech in Artificial Intelligence & Machine Learning', dept: 'School of Computer Science & Tech' },
    { value: 'B.Tech in Computer Science & Engineering', label: 'B.Tech in Computer Science & Engineering', dept: 'School of Computer Science & Tech' },
    { value: 'B.Tech in Data Science & Big Data Analytics', label: 'B.Tech in Data Science & Big Data Analytics', dept: 'School of Computing & Informatics' },
    { value: 'B.Tech in Electronics & Communication', label: 'B.Tech in Electronics & Communication', dept: 'School of Electrical & Electronics' },
    { value: 'B.Tech in Mechanical & Robotics Engineering', label: 'B.Tech in Mechanical & Robotics Engineering', dept: 'School of Mechanical Sciences' }
  ];

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
      name: '',
      rollNumber: '',
      email: '',
      program: programs[0].value,
      password: '',
      confirmPassword: '',
      agreeTerms: true
    },
    validationRules: {
      name: {
        required: true,
        minLength: 3,
        label: 'Full Legal Name'
      },
      rollNumber: {
        required: true,
        minLength: 5,
        label: 'Roll / Enrollment ID'
      },
      email: {
        required: true,
        isUniversityEmail: true,
        label: 'University Email'
      },
      password: {
        required: true,
        minLength: 6,
        label: 'Password'
      },
      confirmPassword: {
        required: true,
        matchField: 'password',
        matchMessage: 'Passwords do not match.',
        label: 'Confirm Password'
      },
      agreeTerms: {
        validate: (val) => (!val ? 'You must accept the Academic Honor Code.' : '')
      }
    },
    onSubmit: async (formValues) => {
      setFormGlobalError('');
      try {
        const foundProg = programs.find((p) => p.value === formValues.program);
        const newUser = await signup({
          name: formValues.name.trim(),
          rollNumber: formValues.rollNumber.trim(),
          email: formValues.email.trim(),
          department: foundProg ? foundProg.dept : 'School of Computer Science & Tech',
          program: formValues.program,
          password: formValues.password.trim(),
          section: 'U25-' + formValues.rollNumber.trim().slice(-2) || 'U25-A1',
          mentor: 'Dr. S. K. Narayan'
        });

        showSuccess(`Account registered successfully for ${newUser.name}!`);
        navigate('/dashboard');
      } catch (err) {
        setFormGlobalError(err.message || 'Failed to register account.');
      }
    }
  });

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
            {themes.map((t) => (
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

          {/* Global Error Banner */}
          {formGlobalError && (
            <div className="auth-alert-error">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{formGlobalError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-grid-2">
              <InputField
                label="Full Name"
                name="name"
                placeholder="e.g. Priya Sharma"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                required
                icon={User}
              />

              <InputField
                label="Roll / Enrollment No."
                name="rollNumber"
                placeholder="e.g. 25108892"
                value={values.rollNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.rollNumber}
                touched={touched.rollNumber}
                required
                icon={Hash}
              />
            </div>

            <InputField
              label="University / Official Email"
              name="email"
              type="email"
              placeholder="e.g. priya.sharma@apex.edu"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              required
              icon={Mail}
              helperText="Only official email ending in @apex.edu allowed."
            />

            <SelectField
              label="Degree & Major"
              name="program"
              value={values.program}
              onChange={handleChange}
              onBlur={handleBlur}
              options={programs}
              icon={BookOpen}
            />

            <div className="auth-grid-2">
              <InputField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 6 characters"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                required
                icon={Lock}
                rightAction={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-eye-btn"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Repeat password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                required
                icon={Lock}
                rightAction={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="auth-eye-btn"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
            </div>

            <div style={{ marginTop: '2px', marginBottom: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={values.agreeTerms}
                  onChange={handleChange}
                  style={{ accentColor: 'var(--primary)', marginTop: '2px', cursor: 'pointer' }}
                />
                <span>
                  I agree to the <strong>Apex University Academic Honor Code</strong> and agree to abide by portal terms.
                </span>
              </label>
              {touched.agreeTerms && errors.agreeTerms && (
                <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>
                  {errors.agreeTerms}
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              icon={UserPlus}
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
            >
              Create Student Account
            </Button>
          </form>

          {/* Footer Switcher */}
          <div className="auth-card-footer">
            <span className="text-muted" style={{ fontSize: '0.875rem' }}>
              Already registered your student account?
            </span>
            <Link to="/login" className="auth-switch-link">
              <ArrowLeft size={15} />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
