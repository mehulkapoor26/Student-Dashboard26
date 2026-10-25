import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  AlertTriangle, 
  FileText, 
  Download, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function DashboardView({ setActiveTab, currentUser }) {
  const [selectedNoteTag, setSelectedNoteTag] = useState('All');

  const studentName = currentUser?.name || 'Rohit Verma';
  const studentRoll = currentUser?.rollNumber || '25109928';
  const studentProgram = currentUser?.program || 'B.Tech in Artificial Intelligence & Machine Learning';
  const studentMentor = currentUser?.mentor || 'Dr. Lakshita';
  const studentAvatar = currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300';

  const notesList = [
    { id: 1, title: '24CSE0209_DBMS_NormalForms.pdf', author: 'Prof. R. Sharma', date: '2 days ago', size: '1.2 MB', category: 'DBMS' },
    { id: 2, title: 'Object_Oriented_Design_Patterns.pdf', author: 'Dr. V. Gupta', date: '4 days ago', size: '3.4 MB', category: 'OOPS' },
    { id: 3, title: 'Discrete_Structures_Graph_Theory.pdf', author: 'Er. A. Patel', date: '1 week ago', size: '2.1 MB', category: 'Discrete Structures' },
    { id: 4, title: 'Front_End_Engineering_DOM_Guide.pdf', author: 'Dr. S. K. Narayan', date: '3 days ago', size: '1.8 MB', category: 'FEE' }
  ];

  const filteredNotes = selectedNoteTag === 'All' 
    ? notesList 
    : notesList.filter(n => n.category === selectedNoteTag);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Row 1: Welcome Banner & Attendance Compliance */}
      <div className="flex-row-2">
        
        {/* Welcome Card */}
        <div className="dashboard-card" style={{ 
          background: 'var(--hero-bg)', 
          border: '1px solid var(--hero-border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
            <div style={{ flex: 1 }}>
              {/* Badge pill */}
              <div style={{ 
                display: 'inline-block', 
                backgroundColor: 'rgba(37, 99, 235, 0.1)', 
                color: 'var(--primary)', 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                padding: '4px 12px', 
                borderRadius: '6px',
                marginBottom: '12px'
              }}>
                {studentProgram}
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '6px' }}>
                Welcome back, {studentName} 👋
              </h2>

              <p className="text-muted" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
                Roll Number: <strong style={{ color: 'var(--text-main)' }}>{studentRoll}</strong> | Mentor: <span style={{ color: 'var(--primary)' }}>{studentMentor}</span>
              </p>

              {/* Yellow Alert Box */}
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '1rem' }}>💡</span>
                <span>Maintain <strong>&gt;75% attendance</strong> to avoid detention during Term-End exams.</span>
              </div>

              {/* Group & Section Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                <span style={{ border: '1px solid #3b82f6', color: '#3b82f6', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                  Section: U25AIML-G8
                </span>
                <span style={{ border: '1px solid #a855f7', color: '#a855f7', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                  Lab Group: G8-A
                </span>
                <span style={{ border: '1px solid #ec4899', color: '#ec4899', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                  Room: LH-501
                </span>
                <span style={{ border: '1px solid #10b981', color: '#10b981', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                  Advisor: Dr. Lakshita
                </span>
              </div>

              {/* CGPA & Profile Action */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', gap: '32px' }}>
                  <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1 }}>
                      9.35
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cumulative CGPA</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1 }}>
                      3rd
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Semester</div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('my-info')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  View Full Profile <ArrowRight size={16} />
                </button>
              </div>

            </div>

            {/* Avatar Profile Box */}
            <div style={{ position: 'relative', marginLeft: '20px' }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid var(--primary)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
              }}>
                <img 
                  src={studentAvatar} 
                  alt={studentName} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                width: '16px',
                height: '16px',
                backgroundColor: '#10b981',
                border: '3px solid var(--bg-card)',
                borderRadius: '50%'
              }} />
            </div>

          </div>
        </div>

        {/* Attendance Compliance Donut Widget */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="heading-md">Attendance Compliance</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>89.8%</span>
            </div>

            {/* Donut Chart Simulation */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0' }}>
              <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                <svg width="130" height="130" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--bg-subtle)"
                    strokeWidth="3.2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3.5"
                    strokeDasharray="89.8, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)' }}>89.8%</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>135 / 150</div>
                </div>
              </div>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Academic Status: </span>
                <strong style={{ color: '#10b981', fontSize: '0.875rem' }}>Good Standing</strong>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab('attendance')}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            View Attendance Ledger <ChevronRight size={16} />
          </button>
        </div>

      </div>

      {/* Row 2: Timetable Peek, Library Ledger, Academic Updates */}
      <div className="flex-row-3">
        
        {/* Timetable Peek */}
        <div className="dashboard-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="heading-md">Timetable Peek</h3>
            <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>LH-501</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '12px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px' }}>
                IN PROGRESS
              </span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '2px 0', color: 'var(--text-heading)' }}>
                Discrete Structures
              </h4>
              <p className="text-muted" style={{ fontSize: '0.8rem' }}>10:40 AM - 12:10 PM</p>
            </div>

            <div style={{ borderLeft: '3px solid var(--accent-purple)', paddingLeft: '12px', opacity: 0.85 }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-purple)', letterSpacing: '0.5px' }}>
                UPCOMING
              </span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '2px 0', color: 'var(--text-heading)' }}>
                OOPS
              </h4>
              <p className="text-muted" style={{ fontSize: '0.8rem' }}>Next: OOPS (01:00 PM)</p>
            </div>
          </div>
        </div>

        {/* Library Ledger */}
        <div className="dashboard-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="heading-md">Library Ledger</h3>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px' }}>HOLDINGS</span>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
              <span className="text-muted">Quota Borrowed</span>
              <strong style={{ color: 'var(--text-heading)' }}>2 / 5 Books</strong>
            </div>
            <div style={{ height: '6px', backgroundColor: 'var(--bg-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '3px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'var(--bg-subtle)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>Generative Deep Learning</div>
              <div style={{ fontSize: '0.75rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <AlertTriangle size={12} /> Due in 2 days
              </div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>Introduction to Algorithms</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <CheckCircle2 size={12} /> Due in 12 days
              </div>
            </div>
          </div>
        </div>

        {/* Academic Updates */}
        <div className="dashboard-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="heading-md">Academic Updates</h3>
            <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>NEW</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(236, 72, 153, 0.12)', color: '#ec4899', marginTop: '2px' }}>EXAMS</span>
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)' }}>Mid-Term Datesheet</h4>
                <p className="text-muted" style={{ fontSize: '0.75rem' }}>Released today</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6', marginTop: '2px' }}>EVENTS</span>
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)' }}>Guest Lecture: GenAI</h4>
                <p className="text-muted" style={{ fontSize: '0.75rem' }}>Aug 17, 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: LMS Deadlines & Notes Subnet Peek */}
      <div style={{ display: 'flex', gap: '24px' }}>
        
        {/* LMS Deadlines */}
        <div className="dashboard-card" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="heading-md">LMS Deadlines</h3>
            <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>2 PENDING</span>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', items: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                Database Management System Assignment 3
              </h4>
            </div>
            <p className="text-muted" style={{ fontSize: '0.78rem', marginTop: '6px', marginLeft: '16px', color: '#f59e0b', fontWeight: 600 }}>
              Due in 20 hours ⚠️
            </p>
          </div>
        </div>

        {/* Notes Subnet Peek */}
        <div className="dashboard-card" style={{ flex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="heading-md">Notes Subnet Peek</h3>
            
            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'DBMS', 'Discrete Structures', 'OOPS', 'FEE'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedNoteTag(tag)}
                  style={{
                    border: '1px solid var(--border-color)',
                    backgroundColor: selectedNoteTag === tag ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: selectedNoteTag === tag ? '#ffffff' : 'var(--text-muted)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Notes file item list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredNotes.map(note => (
              <div 
                key={note.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      {note.title}
                    </h4>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {note.author} • {note.date}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{note.size}</span>
                  <button style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--primary)',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
