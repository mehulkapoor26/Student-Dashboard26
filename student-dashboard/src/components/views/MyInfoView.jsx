import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  User, 
  BookOpen, 
  Phone, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Mail, 
  Calendar, 
  Droplets, 
  Globe, 
  Fingerprint, 
  GraduationCap, 
  Edit3, 
  Save, 
  X, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';

export default function MyInfoView({ currentUser: propUser, onUpdateUser: propUpdate }) {
  const { currentUser: authUser, updateProfile } = useAuth();
  const { showSuccess } = useToast();
  const currentUser = propUser || authUser;
  const onUpdateUser = propUpdate || updateProfile;

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Default / initial student information state
  const initialStudentData = {
    name: currentUser?.name || 'Rohit Verma',
    rollNumber: currentUser?.rollNumber || '25109928',
    program: currentUser?.program || 'B.Tech in Artificial Intelligence & Machine Learning',
    department: currentUser?.department || 'School of Computer Science & Tech',
    section: currentUser?.section || 'U25AIML-G8',
    mentor: currentUser?.mentor || 'Dr. Lakshita',
    email: currentUser?.email || 'rohit.verma@apex.edu',
    avatarUrl: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    dob: currentUser?.dob || '14 October 2004',
    gender: currentUser?.gender || 'Male',
    bloodGroup: currentUser?.bloodGroup || 'O+',
    nationality: currentUser?.nationality || 'Indian',
    aadhaar: currentUser?.aadhaar || 'XXXX-XXXX-8921',
    mobile: currentUser?.mobile || '+91 98765 43210',
    address: currentUser?.address || 'House No. 142, Sector 15, Chandigarh, UT 160015',
    guardianName: currentUser?.guardianName || 'Mr. Suresh Verma',
    guardianMobile: currentUser?.guardianMobile || '+91 98123 76543',
    semester: currentUser?.semester || 'Semester 3 (Year 2)',
    cgpa: currentUser?.cgpa || '9.35 / 10.0',
    credits: currentUser?.credits || '48 Credits'
  };

  const [formData, setFormData] = useState(initialStudentData);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formError) setFormError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setFormError('Student full name cannot be blank.');
      return;
    }
    if (!formData.mobile.trim()) {
      setFormError('Mobile number is required for official communications.');
      return;
    }

    // Call update callback if provided
    if (onUpdateUser) {
      onUpdateUser(formData);
    }

    showSuccess('Profile updated successfully!');
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const handleCancel = () => {
    setFormData(initialStudentData);
    setFormError('');
    setIsEditing(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text-heading)',
    fontSize: '0.9rem',
    fontWeight: 600,
    outline: 'none',
    marginTop: '4px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Success Notification Alert */}
      {saveSuccess && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          borderRadius: '10px',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b981',
          color: '#10b981',
          fontWeight: 700,
          fontSize: '0.9rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={18} />
            <span>Profile information updated successfully! Changes saved to your student record.</span>
          </div>
          <button 
            onClick={() => setSaveSuccess(false)}
            style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', padding: '2px' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Form Error Banner */}
      {formError && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 18px',
          borderRadius: '10px',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid #ef4444',
          color: '#ef4444',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          <AlertCircle size={18} />
          <span>{formError}</span>
        </div>
      )}

      {/* Student Top Header Card */}
      <div className="dashboard-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--primary)',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}>
            <img 
              src={formData.avatarUrl} 
              alt={formData.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <h2 className="heading-lg" style={{ margin: 0 }}>{formData.name}</h2>
              <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>Active Student</span>
            </div>
            <p className="text-muted" style={{ fontSize: '0.9rem', margin: '4px 0' }}>
              {formData.program} | Roll: <strong style={{ color: 'var(--text-main)' }}>{formData.rollNumber}</strong>
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '0.825rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
              <span>🏫 {formData.department}</span>
              <span>📍 Section: {formData.section}</span>
              <span>🎓 Mentor: {formData.mentor}</span>
            </div>
          </div>
        </div>

        {/* Action Button: Toggle Edit Mode */}
        <div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 700 }}
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px' }}
              >
                <X size={16} /> Cancel
              </button>
              <button
                type="button"
                onClick={handleFormSubmit}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', fontWeight: 700 }}
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Information View or Edit Form */}
      <form onSubmit={handleFormSubmit}>
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Section 1: Personal Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <User size={18} style={{ color: 'var(--primary)' }} />
              <h3 className="heading-md" style={{ margin: 0, fontSize: '1.05rem' }}>Personal Information</h3>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {/* Full Name */}
              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    style={inputStyle}
                    required
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.name}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Date of Birth</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    placeholder="e.g. 14 October 2004"
                    style={inputStyle}
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.dob}</p>
                )}
              </div>

              {/* Gender */}
              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Gender</label>
                {isEditing ? (
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    style={inputStyle}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.gender}</p>
                )}
              </div>

              {/* Blood Group */}
              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Blood Group</label>
                {isEditing ? (
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                    style={inputStyle}
                  >
                    <option value="O+">O Positive (O+)</option>
                    <option value="O-">O Negative (O-)</option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                  </select>
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.bloodGroup}</p>
                )}
              </div>

              {/* Nationality */}
              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Nationality</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    style={inputStyle}
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.nationality}</p>
                )}
              </div>

              {/* Aadhaar / National ID */}
              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Aadhaar / National ID</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.aadhaar}
                    onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                    style={inputStyle}
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.aadhaar}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Academic Record */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} style={{ color: 'var(--primary)' }} />
                <h3 className="heading-md" style={{ margin: 0, fontSize: '1.05rem' }}>Academic Record</h3>
              </div>
              <span className="badge" style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)', fontSize: '0.7rem' }}>Official University Record</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Current Program</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.program}
                    onChange={(e) => handleInputChange('program', e.target.value)}
                    style={inputStyle}
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.program}</p>
                )}
              </div>

              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Semester & Year</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.semester}
                    onChange={(e) => handleInputChange('semester', e.target.value)}
                    style={inputStyle}
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.semester}</p>
                )}
              </div>

              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Section</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => handleInputChange('section', e.target.value)}
                    style={inputStyle}
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.section}</p>
                )}
              </div>

              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Academic Mentor</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.mentor}
                    onChange={(e) => handleInputChange('mentor', e.target.value)}
                    style={inputStyle}
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.mentor}</p>
                )}
              </div>

              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Cumulative CGPA</label>
                <p style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--primary)', marginTop: '4px' }}>{formData.cgpa}</p>
              </div>

              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Credits Completed</label>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.credits}</p>
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Address */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <MapPin size={18} style={{ color: 'var(--primary)' }} />
              <h3 className="heading-md" style={{ margin: 0, fontSize: '1.05rem' }}>Contact & Address</h3>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: '1 1 280px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>University Email</label>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginTop: '4px' }}>{formData.email}</p>
              </div>

              <div style={{ flex: '1 1 280px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Mobile Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    style={inputStyle}
                    required
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.mobile}</p>
                )}
              </div>

              <div style={{ width: '100%' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Permanent Address</label>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                ) : (
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>
                    {formData.address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Guardian Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <Phone size={18} style={{ color: 'var(--primary)' }} />
              <h3 className="heading-md" style={{ margin: 0, fontSize: '1.05rem' }}>Guardian Details</h3>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: '1 1 280px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Father / Guardian Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.guardianName}
                    onChange={(e) => handleInputChange('guardianName', e.target.value)}
                    style={inputStyle}
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.guardianName}</p>
                )}
              </div>

              <div style={{ flex: '1 1 280px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Guardian Mobile Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.guardianMobile}
                    onChange={(e) => handleInputChange('guardianMobile', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    style={inputStyle}
                  />
                ) : (
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)', marginTop: '4px' }}>{formData.guardianMobile}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar when in Edit Mode */}
          {isEditing && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '20px',
              marginTop: '10px'
            }}>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
                style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', fontWeight: 700, fontSize: '0.9rem' }}
              >
                <Save size={16} /> Save Profile Changes
              </button>
            </div>
          )}

        </div>
      </form>

    </div>
  );
}
