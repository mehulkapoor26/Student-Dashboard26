import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';

const MOCK_NOTICES = [
  {
    id: 1,
    title: 'Mid-Term Examination Datesheet Autumn 2026',
    category: 'EXAMS',
    date: '27 Oct 2026',
    desc: 'The official datesheet for B.E. (CSE, Batch 2025) 3rd Sem Mid-Term evaluations has been published. Check venue and timing.',
    urgent: true
  },
  {
    id: 2,
    title: 'Project-based Evaluation-II (25CSE0203) Schedule',
    category: 'EXAMS',
    date: '26 Oct 2026',
    desc: 'Front End Engineering-II evaluation scheduled from 26-10-2026 to 30-10-2026. Topics: React Router, Context API, Redux Toolkit, Form Handling.',
    urgent: true
  },
  {
    id: 3,
    title: 'Guest Lecture: Industrial React State Architectures',
    category: 'EVENTS',
    date: '24 Oct 2026',
    desc: 'Interactive workshop on Redux Toolkit vs Zustand and async thunk lifecycle architectures in Newton Hall.',
    urgent: false
  },
  {
    id: 4,
    title: 'Annual Campus Hackathon 2026 Registrations Open',
    category: 'EVENTS',
    date: '20 Oct 2026',
    desc: 'Registrations are open for the 36-hour Chitkara Hackathon. Prize pool of INR 2.5 Lakhs.',
    urgent: false
  },
  {
    id: 5,
    title: 'Central Library Extended 24/7 Hours During PE-II',
    category: 'GENERAL',
    date: '18 Oct 2026',
    desc: 'The central digital library repository will remain accessible 24/7 for project preparation and peer programming.',
    urgent: false
  }
];

export default function UpdatesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [notices] = useState(MOCK_NOTICES);

  const filteredUpdates = notices.filter((u) => {
    const matchesSearch =
      u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      categoryFilter === 'All' || u.category.toUpperCase() === categoryFilter.toUpperCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Filter and Search Bar */}
      <div className="dashboard-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} style={{ color: 'var(--primary)' }} />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)' }}>
            Official Bulletins
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search box */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search circulars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-main)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Category buttons */}
          {['All', 'EXAMS', 'EVENTS', 'GENERAL'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                border: '1px solid var(--border-color)',
                backgroundColor: categoryFilter === cat ? 'var(--primary)' : 'var(--bg-subtle)',
                color: categoryFilter === cat ? '#ffffff' : 'var(--text-muted)',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredUpdates.length === 0 ? (
          <div className="dashboard-card" style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
            <p>No circulars found matching your search criteria.</p>
          </div>
        ) : (
          filteredUpdates.map((u) => (
            <div
              key={u.id}
              className="dashboard-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                borderLeft: u.urgent ? '4px solid #ef4444' : '4px solid var(--primary)',
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: u.category === 'EXAMS' ? 'rgba(236, 72, 153, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                      color: u.category === 'EXAMS' ? '#ec4899' : '#3b82f6',
                      fontWeight: 700
                    }}
                  >
                    {u.category}
                  </span>
                  {u.urgent && (
                    <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', fontWeight: 700 }}>
                      URGENT
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {u.date}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
                {u.title}
              </h3>

              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                {u.desc}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
