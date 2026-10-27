import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useForm } from '../../hooks/useForm';
import InputField from '../common/InputField';
import TextAreaField from '../common/TextAreaField';
import Button from '../common/Button';
import {
  User,
  Briefcase,
  Code2,
  Award,
  Send,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  Terminal,
  Globe,
  Layers
} from 'lucide-react';

export default function PortfolioView() {
  const { currentUser } = useAuth();
  const { showSuccess } = useToast();
  const [activeSubTab, setActiveSubTab] = useState('projects'); // 'projects' | 'skills' | 'certifications' | 'contact'

  const studentName = currentUser?.name || 'Rohit Verma';
  const studentProgram = currentUser?.program || 'B.E. Computer Science & Engineering (Batch 2025)';

  // Validation rules for Portfolio Contact Form using custom useForm hook
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useForm({
    initialValues: {
      senderName: '',
      senderEmail: '',
      subject: '',
      message: ''
    },
    validationRules: {
      senderName: {
        required: true,
        minLength: 3,
        label: 'Your Name'
      },
      senderEmail: {
        required: true,
        isEmail: true,
        label: 'Email Address'
      },
      subject: {
        required: true,
        minLength: 4,
        label: 'Subject'
      },
      message: {
        required: true,
        minLength: 15,
        label: 'Message'
      }
    },
    onSubmit: async (formValues) => {
      // Simulate async form submit
      await new Promise(r => setTimeout(r, 600));
      showSuccess(`Message sent! Thank you ${formValues.senderName}, Rohit will reply shortly.`);
      resetForm();
    }
  });

  const skills = [
    { name: 'React 18 & SPA Architecture', level: 92, category: 'Frontend' },
    { name: 'React Router v6 Navigation', level: 90, category: 'Frontend' },
    { name: 'Redux Toolkit & Global State', level: 88, category: 'State Management' },
    { name: 'Context API & Custom Hooks', level: 94, category: 'State Management' },
    { name: 'Form Validation & Reusable Components', level: 90, category: 'Frontend' },
    { name: 'JavaScript (ES6+) & DOM Manipulation', level: 95, category: 'Core' },
    { name: 'HTML5, CSS3 & Responsive Design', level: 96, category: 'Core' },
    { name: 'Async State, Promises & Error Handling', level: 86, category: 'Core' }
  ];

  const projects = [
    {
      title: 'Academix - Unified Student Dashboard',
      description: 'Production-ready academic management SPA featuring dynamic theme switching, session persistence, attendance calculation, and responsive layout.',
      tags: ['React', 'React Router v6', 'Context API', 'CSS Variables'],
      status: 'Current PE-II Project',
      stars: '4.9/5'
    },
    {
      title: 'Campus Bookstore & Redux Cart',
      description: 'E-commerce cart mini-project powered by Redux Toolkit with sliced reducers, coupon discount calculation, and simulated credit checkout.',
      tags: ['Redux Toolkit', 'createSlice', 'useDispatch', 'useSelector'],
      status: 'Completed',
      stars: '5.0/5'
    },
    {
      title: 'Dynamic Safe-Bunk Attendance Engine',
      description: 'Interactive mathematical simulation allowing students to model prospective skipped or attended lectures against the mandatory 75% threshold.',
      tags: ['React Hooks', 'Dynamic State', 'Mathematical Modeling'],
      status: 'Live on Portal',
      stars: '4.8/5'
    },
    {
      title: 'Async Academic Updates & Noticeboard',
      description: 'Resilient asynchronous notice feed demonstrating pending skeletons, simulated network timeout failures, and retry capabilities.',
      tags: ['Async State', 'Loading Spiners', 'Error Handling'],
      status: 'Completed',
      stars: '4.7/5'
    }
  ];

  const certifications = [
    {
      title: 'Front End Engineering I (PE-I Certified)',
      issuer: 'Chitkara University CUIET',
      year: '2026',
      grade: 'Grade A+ • Excellent'
    },
    {
      title: 'Modern React with Redux Masterclass',
      issuer: 'Coursera / Meta Front-End Specialization',
      year: '2026',
      grade: 'Verified Credential'
    },
    {
      title: 'JavaScript Algorithms & Data Structures',
      issuer: 'freeCodeCamp',
      year: '2025',
      grade: '300 Hours Completed'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Hero Header Card */}
      <div className="dashboard-card" style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)',
        borderLeft: '5px solid var(--primary)',
        padding: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '2.4rem',
              fontWeight: 800,
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)'
            }}>
              {studentName.charAt(0)}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge" style={{ backgroundColor: 'rgba(37, 99, 235, 0.15)', color: 'var(--primary)', fontWeight: 700 }}>
                  Mini Project: Portfolio Site with Routing
                </span>
                <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                  PE-II Syllabus Aligned
                </span>
              </div>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0 0 6px 0' }}>
                {studentName}
              </h1>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.95rem' }}>
                Frontend Developer &amp; CSE Undergraduate • Chitkara University Batch 2025
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant="outline"
              size="sm"
              icon={Github}
              onClick={() => window.open('https://github.com', '_blank')}
            >
              GitHub
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Send}
              onClick={() => setActiveSubTab('contact')}
            >
              Get in Touch
            </Button>
          </div>
        </div>

        {/* Sub-Navigation Pills */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '28px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', flexWrap: 'wrap' }}>
          {[
            { id: 'projects', label: 'Featured Projects', icon: Briefcase },
            { id: 'skills', label: 'Technical Skills Matrix', icon: Code2 },
            { id: 'certifications', label: 'Certifications', icon: Award },
            { id: 'contact', label: 'Contact & Hire Form (Reusable Form Demo)', icon: Mail }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: `1.5px solid ${active ? 'var(--primary)' : 'var(--border-color)'}`,
                  backgroundColor: active ? 'var(--primary)' : 'var(--bg-card)',
                  color: active ? '#ffffff' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content 1: Projects Showcase */}
      {activeSubTab === 'projects' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px'
        }}>
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="dashboard-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
                borderLeft: '4px solid var(--primary)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="badge" style={{ backgroundColor: 'rgba(37, 99, 235, 0.12)', color: 'var(--primary)', fontWeight: 700 }}>
                    {proj.status}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}>
                    ★ {proj.stars}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-heading)', margin: '0 0 10px 0' }}>
                  {proj.title}
                </h3>

                <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                  {proj.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.75rem',
                        backgroundColor: 'var(--bg-subtle)',
                        color: 'var(--text-muted)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        fontWeight: 600
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 2: Technical Skills Matrix */}
      {activeSubTab === 'skills' && (
        <div className="dashboard-card" style={{ padding: '28px' }}>
          <h3 className="heading-md" style={{ marginBottom: '6px' }}>Front End Engineering II Skills Matrix</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '24px' }}>
            Demonstrated competencies required as per PE-II evaluation syllabus.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)' }}>
                    {skill.name}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {skill.level}%
                  </span>
                </div>

                <div style={{
                  height: '8px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--border-color)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    backgroundColor: 'var(--primary)',
                    borderRadius: '10px',
                    transition: 'width 0.8s ease'
                  }} />
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', display: 'block' }}>
                  Category: {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Certifications */}
      {activeSubTab === 'certifications' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {certifications.map((cert, cIdx) => (
            <div
              key={cIdx}
              className="dashboard-card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '24px',
                borderLeft: '4px solid #10b981'
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Award size={24} />
              </div>

              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {cert.title}
                </h4>
                <p className="text-muted" style={{ margin: '0 0 8px 0', fontSize: '0.825rem' }}>
                  {cert.issuer} • {cert.year}
                </p>
                <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontSize: '0.75rem' }}>
                  {cert.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 4: Reusable Form with Validation Strategies */}
      {activeSubTab === 'contact' && (
        <div className="dashboard-card" style={{ maxWidth: '640px', margin: '0 auto', width: '100%', padding: '28px' }}>
          <div style={{ marginBottom: '20px' }}>
            <span className="badge" style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: 'var(--accent-pink)', fontWeight: 700 }}>
              Form Handling & Reusable Input Components Demo
            </span>
            <h3 className="heading-md" style={{ marginTop: '8px', marginBottom: '4px' }}>
              Project Inquiries &amp; Recruiter Contact Form
            </h3>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
              Built using custom <code>useForm</code> hook with real-time field validation, touched status, and reusable inputs.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <InputField
                label="Full Name"
                name="senderName"
                placeholder="e.g. Dr. Rajesh Sharma"
                value={values.senderName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.senderName}
                touched={touched.senderName}
                required
                icon={User}
              />

              <InputField
                label="Email Address"
                name="senderEmail"
                type="email"
                placeholder="e.g. evaluator@chitkara.edu.in"
                value={values.senderEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.senderEmail}
                touched={touched.senderEmail}
                required
                icon={Mail}
              />
            </div>

            <InputField
              label="Subject / Inquiring Topic"
              name="subject"
              placeholder="e.g. Front End Engineering II Project Review"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.subject}
              touched={touched.subject}
              required
            />

            <TextAreaField
              label="Project Feedback or Message"
              name="message"
              rows={4}
              maxLength={400}
              placeholder="Please provide questions, suggestions, or feedback regarding the PE-II submission..."
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.message}
              touched={touched.message}
              required
              helperText="Minimum 15 characters required for submission."
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
              <Button
                type="button"
                variant="secondary"
                onClick={resetForm}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="primary"
                icon={Send}
                isLoading={isSubmitting}
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
