import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  FileText, 
  Download, 
  Sparkles,
  BellRing,
  BookOpen,
  Award,
  Filter,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState('September 2026');
  
  const events = [
    { 
      id: 1, 
      date: '12 Sep 2026', 
      dayNum: 12,
      time: '11:59 PM',
      title: 'DBMS Assignment 3 Submission', 
      type: 'Assignment', 
      location: 'Online Portal',
      status: 'Submitted',
      color: '#ef4444',
      actionText: 'View Submission'
    },
    { 
      id: 2, 
      date: '17 Sep 2026', 
      dayNum: 17,
      time: '02:00 PM - 04:00 PM',
      title: 'Guest Lecture: GenAI & LLM Architecture', 
      type: 'Event', 
      location: 'Auditorium Hall B',
      status: 'Tomorrow',
      color: '#3b82f6',
      actionText: 'Add to Calendar'
    },
    { 
      id: 3, 
      date: '25 Sep 2026', 
      dayNum: 25,
      time: '09:30 AM - 12:30 PM',
      title: 'Mid-Term Examinations Begin', 
      type: 'Exam', 
      location: 'Examination Block LH-501',
      status: 'In 9 days',
      color: '#ec4899',
      actionText: 'Download Hall Ticket'
    },
    { 
      id: 4, 
      date: '02 Oct 2026', 
      dayNum: 2,
      time: 'Full Day',
      title: 'Gandhi Jayanti Holiday', 
      type: 'Holiday', 
      location: 'Campus Closed',
      status: 'Upcoming',
      color: '#10b981',
      actionText: 'Campus Circular'
    }
  ];



  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Calendar Header */}
      <div className="dashboard-card" style={{ 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '16px',
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)',
        borderLeft: '5px solid var(--primary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            width: '46px', 
            height: '46px', 
            borderRadius: '12px', 
            backgroundColor: 'var(--primary-light)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <CalendarIcon size={24} />
          </div>
          <div>
            <h2 className="heading-lg" style={{ margin: 0, fontSize: '1.35rem' }}>Academic Calendar 2026</h2>
            <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0, marginTop: '2px' }}>
              Semester III • Schedule, Exam Dates & Submissions
            </p>
          </div>
        </div>

        <div>
          <span style={{ 
            fontWeight: 800, 
            fontSize: '0.95rem', 
            color: 'var(--primary)',
            backgroundColor: 'var(--primary-light)',
            padding: '8px 16px',
            borderRadius: '10px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            display: 'inline-block'
          }}>
            {currentMonth}
          </span>
        </div>
      </div>

      {/* Top 3 Quick Metric Cards */}
      <div className="flex-row-3">
        <div className="dashboard-card" style={{ borderLeft: '4px solid #ec4899', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(236, 72, 153, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899' }}>
            <Award size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Next Major Exam</span>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '2px' }}>Mid-Term Examinations</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ec4899' }}>Starts 25 Sep • In 9 Days</span>
          </div>
        </div>

        <div className="dashboard-card" style={{ borderLeft: '4px solid #3b82f6', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
            <Sparkles size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Next Campus Event</span>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '2px' }}>GenAI & LLM Architecture</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b82f6' }}>17 Sep • Tomorrow (02:00 PM)</span>
          </div>
        </div>

        <div className="dashboard-card" style={{ borderLeft: '4px solid #10b981', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Upcoming Holiday</span>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '2px' }}>Gandhi Jayanti</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>02 Oct • Campus Closed</span>
          </div>
        </div>
      </div>

      {/* Main Full-Width Schedule List */}
      <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h3 className="heading-md" style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} style={{ color: 'var(--primary)' }} /> Schedule & Milestones
          </h3>
        </div>

        {/* Timeline Events List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {events.map((e) => (
            <div 
              key={e.id} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 22px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderLeft: `5px solid ${e.color}`,
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                {/* Date Badge Box */}
                <div style={{
                  minWidth: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                }}>
                  <span style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {e.date.split(' ')[1]}
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1 }}>
                    {e.dayNum}
                  </span>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      fontWeight: 800, 
                      color: e.color, 
                      backgroundColor: `${e.color}15`,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      textTransform: 'uppercase' 
                    }}>
                      {e.type}
                    </span>

                    <span style={{ 
                      fontSize: '0.725rem', 
                      fontWeight: 700, 
                      color: e.status === 'Tomorrow' ? '#f59e0b' : e.status === 'In 9 days' ? '#ec4899' : e.status === 'Submitted' ? '#10b981' : 'var(--text-muted)' 
                    }}>
                      • {e.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-heading)', margin: '4px 0 3px 0' }}>
                    {e.title}
                  </h4>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14} /> {e.time}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={14} /> {e.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  className="btn-secondary" 
                  style={{ 
                    fontSize: '0.8rem', 
                    padding: '8px 14px', 
                    borderRadius: '8px', 
                    gap: '6px',
                    fontWeight: 700 
                  }}
                >
                  {e.actionText} <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Download & Announcement Banner */}
      <div className="dashboard-card" style={{ 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '16px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(37, 99, 235, 0.02) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <BellRing size={20} />
          </div>
          <div>
            <strong style={{ fontSize: '0.95rem', color: 'var(--text-heading)' }}>
              Official Datesheet Published for Semester III Examinations
            </strong>
            <p className="text-muted" style={{ fontSize: '0.8rem', margin: '2px 0 0 0' }}>
              Check seating plan and exam guidelines prior to 25th September.
            </p>
          </div>
        </div>

        <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', gap: '8px' }}>
          <Download size={15} /> Download Datesheet PDF
        </button>
      </div>

    </div>
  );
}


