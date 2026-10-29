import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  Download, 
  Search, 
  Sparkles, 
  BookOpen, 
  Star, 
  Eye, 
  X, 
  CheckCircle2, 
  Filter, 
  User, 
  Calendar, 
  Clock, 
  FileCode 
} from 'lucide-react';

export default function NotesView() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All Types');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState([1, 4]);

  const [notes, setNotes] = useState([
    { 
      id: 1, 
      title: 'DBMS Normalization & 1NF to BCNF Guide', 
      filename: '24CSE0209_DBMS_NormalForms.pdf', 
      subject: 'DBMS', 
      category: 'Lecture Notes',
      author: 'Prof. R. Sharma', 
      date: '14 Sep 2026', 
      size: '1.2 MB', 
      downloads: 142,
      fileType: 'PDF',
      topics: ['1NF, 2NF, 3NF Definitions', 'Boyce-Codd Normal Form (BCNF)', 'Lossless Join Decomposition', 'Functional Dependency Rules']
    },
    { 
      id: 2, 
      title: 'Object Oriented Design Patterns & SOLID', 
      filename: 'Object_Oriented_Design_Patterns.pdf', 
      subject: 'OOPS', 
      category: 'Lab Manual',
      author: 'Dr. Neha Verma', 
      date: '12 Sep 2026', 
      size: '3.4 MB', 
      downloads: 89,
      fileType: 'PDF',
      topics: ['Creational & Structural Patterns', 'Singleton & Factory Pattern', 'Observer & Strategy Pattern', 'SOLID Design Principles']
    },
    { 
      id: 3, 
      title: 'Discrete Structures Graph Theory & Trees', 
      filename: 'Discrete_Structures_Graph_Theory.pdf', 
      subject: 'Discrete Structures', 
      category: 'Question Bank',
      author: 'Dr. V. Gupta', 
      date: '08 Sep 2026', 
      size: '2.1 MB', 
      downloads: 210,
      fileType: 'PDF',
      topics: ['Graph Theory Algorithms', 'Combinatorics & Logic', 'Recurrence Relations', 'Tree Traversal Algorithms']
    },
    { 
      id: 4, 
      title: 'Front End Engineering (FEE) React & DOM Guide', 
      filename: 'FEE_React_DOM_Guide.pdf', 
      subject: 'FEE', 
      category: 'Lecture Notes',
      author: 'Dr. S. K. Narayan', 
      date: '16 Sep 2026', 
      size: '4.8 MB', 
      downloads: 55,
      fileType: 'PDF',
      topics: ['DOM Manipulation', 'React Hooks & State', 'CSS Flexbox & Grid', 'Responsive Web Design']
    },
    { 
      id: 5, 
      title: 'Discrete Structures Logic & Set Theory Notes', 
      filename: 'Discrete_Structures_Set_Theory.pdf', 
      subject: 'Discrete Structures', 
      category: 'Lab Manual',
      author: 'Dr. V. Gupta', 
      date: '05 Sep 2026', 
      size: '1.8 MB', 
      downloads: 118,
      fileType: 'PDF',
      topics: ['Set Operations', 'Propositional Logic', 'Mathematical Induction', 'Relations & Functions']
    },
    { 
      id: 6, 
      title: 'SQL Complex Queries & Indexing Cheatsheet', 
      filename: 'DBMS_Complex_Queries_Cheatsheet.pdf', 
      subject: 'DBMS', 
      category: 'Cheatsheet',
      author: 'Prof. R. Sharma', 
      date: '01 Sep 2026', 
      size: '950 KB', 
      downloads: 320,
      fileType: 'PDF',
      topics: ['WINDOW Functions (ROW_NUMBER, RANK)', 'Subqueries & CTEs', 'B-Tree & Hash Indexing', 'Query Execution Plan Analysis']
    }
  ]);

  // Filter handlers
  const filteredNotes = notes.filter(n => {
    const matchesTag = selectedTag === 'All' || n.subject === selectedTag;
    const matchesCategory = selectedCategory === 'All Types' || n.category === selectedCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
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
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="heading-lg" style={{ margin: 0, fontSize: '1.35rem' }}>Notes Subnet & Study Resources</h2>
            <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0, marginTop: '2px' }}>
              Verified syllabus notes, faculty lectures, lab manuals, and exam preparation sheets
            </p>
          </div>
        </div>

      </div>

      {/* Top 3 Metric Stat Cards */}
      <div className="flex-row-3">
        <div className="dashboard-card" style={{ borderLeft: '4px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <FileText size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Available Repository</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '2px' }}>{notes.length} Verified Files</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>Updated for Semester III</span>
          </div>
        </div>

        <div className="dashboard-card" style={{ borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
            <Download size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Most Downloaded Sheet</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '2px' }}>SQL Complex Queries</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b' }}>320 Total Downloads</span>
          </div>
        </div>

        <div className="dashboard-card" style={{ borderLeft: '4px solid #10b981', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <Sparkles size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recent Resource</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '2px' }}>DBMS Normalization</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>14 Sep 2026 • Prof. Sharma</span>
          </div>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Subject Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '4px' }}>Subject:</span>
            {['All', 'DBMS', 'Discrete Structures', 'OOPS', 'FEE'].map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  border: '1px solid',
                  borderColor: selectedTag === tag ? 'var(--primary)' : 'var(--border-color)',
                  backgroundColor: selectedTag === tag ? 'var(--primary)' : 'var(--bg-card)',
                  color: selectedTag === tag ? '#ffffff' : 'var(--text-main)',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Category Dropdown & Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <option value="All Types">All Resource Types</option>
              <option value="Lecture Notes">Lecture Notes</option>
              <option value="Lab Manual">Lab Manuals</option>
              <option value="Question Bank">Question Banks</option>
              <option value="Cheatsheet">Cheatsheets</option>
            </select>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search notes, subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  minWidth: '220px'
                }}
              />
              {searchTerm && (
                <X 
                  size={14} 
                  onClick={() => setSearchTerm('')} 
                  style={{ position: 'absolute', right: '10px', cursor: 'pointer', color: 'var(--text-muted)' }} 
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredNotes.map(n => {
          const isBookmarked = bookmarkedIds.includes(n.id);

          return (
            <div 
              key={n.id} 
              className="dashboard-card" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justify: 'space-between',
                gap: '16px',
                padding: '20px',
                borderTop: `4px solid ${
                  n.subject === 'DBMS' ? '#3b82f6' : 
                  n.subject === 'OOPS' ? '#ec4899' : 
                  n.subject === 'Discrete Structures' ? '#8b5cf6' : '#10b981'
                }`
              }}
            >
              <div>
                {/* Top badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge" style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-main)' }}>
                      {n.subject}
                    </span>
                    <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', fontSize: '0.7rem' }}>
                      {n.category}
                    </span>
                  </div>

                  <button 
                    onClick={() => toggleBookmark(n.id)}
                    title={isBookmarked ? "Bookmarked" : "Bookmark file"}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: isBookmarked ? '#f59e0b' : 'var(--text-muted)' }}
                  >
                    <Star size={18} fill={isBookmarked ? '#f59e0b' : 'none'} />
                  </button>
                </div>

                {/* File Title & Icon */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <FileText size={22} />
                  </div>

                  <div>
                    <h3 style={{ fontSize: '0.975rem', fontWeight: 800, color: 'var(--text-heading)', margin: 0, lineHeight: 1.3 }}>
                      {n.title}
                    </h3>
                    <p className="text-muted" style={{ fontSize: '0.75rem', margin: '4px 0 0 0' }}>
                      {n.filename}
                    </p>
                  </div>
                </div>
              </div>

              {/* Resource Info Footer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={13} /> {n.author}
                  </span>
                  <span>{n.size}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {n.downloads} downloads
                  </span>

                  <button 
                    className="btn-primary"
                    style={{ fontSize: '0.775rem', padding: '6px 12px', gap: '5px', fontWeight: 700 }}
                  >
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>



    </div>
  );
}

