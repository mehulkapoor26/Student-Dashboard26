import React, { useState } from 'react';
import { Bell, Search, Filter, Tag, ArrowUpRight } from 'lucide-react';

export default function UpdatesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const updates = [
    { id: 1, title: 'Mid-Term Examination Datesheet Autumn 2026', category: 'EXAMS', date: '7 Sep 2026', desc: 'The official datesheet for B.Tech Semester III Mid-Term exams has been released. Exams commence on September 25th.', urgent: true },
    { id: 2, title: 'Guest Lecture: Generative AI & Industrial LLMs', category: 'EVENTS', date: '5 Sep 2026', desc: 'Join Dr. S. Nambiar from DeepMind for a session on cutting edge LLM fine-tuning techniques in Auditorium 2.', urgent: false },
    { id: 3, title: 'Campus Hackathon 2026 Registration Open', category: 'PLacements', date: '3 Sep 2026', desc: 'Registration for the annual 36-hour hackathon is now open. Cash prize pool of INR 2.5 Lakhs.', urgent: false },
    { id: 4, title: 'Library Extended Hours During Exam Week', category: 'GENERAL', date: '1 Sep 2026', desc: 'The central library will remain open 24/7 from Sep 20 to Oct 5 for study sessions.', urgent: false }
  ];

  const filteredUpdates = updates.filter(u => {
    const matchesSearch = u.title.toLowerCase().includes(searchTerm.toLowerCase()) || u.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || u.category.toUpperCase() === categoryFilter.toUpperCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Search & Filter Header */}
      <div className="dashboard-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="heading-lg">Academic Updates & Notices</h2>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>Official campus announcements and circulars</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search box */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search updates..."
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
          {['All', 'EXAMS', 'EVENTS', 'GENERAL'].map(cat => (
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

      {/* Updates Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredUpdates.map(u => (
          <div key={u.id} className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge" style={{
                  backgroundColor: u.category === 'EXAMS' ? 'rgba(236, 72, 153, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                  color: u.category === 'EXAMS' ? '#ec4899' : '#3b82f6'
                }}>
                  {u.category}
                </span>
                {u.urgent && (
                  <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
                    URGENT
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{u.date}</span>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              {u.title}
            </h3>

            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
              {u.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
