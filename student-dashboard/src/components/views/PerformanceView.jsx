import React, { useState } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  GraduationCap, 
  Sparkles,
  FileText,
  UserCheck
} from 'lucide-react';

export default function PerformanceView() {
  // Track expanded semester IDs (default expand Semester III)
  const [expandedSemesters, setExpandedSemesters] = useState({ 3: true });

  const toggleSemester = (id) => {
    setExpandedSemesters(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const semesters = [
    { 
      id: 1,
      sem: 'Semester I', 
      term: 'Autumn 2025',
      sgpa: '9.20', 
      credits: '22 / 22', 
      status: 'Passed (Outstanding)',
      courses: [
        {
          code: '24MTH0101',
          name: 'Engineering Mathematics I',
          shortName: 'Math-I',
          credits: 4,
          internalMarks: '47 / 50',
          internalPct: 94,
          grade: 'A+',
          gradePoint: 9,
          faculty: 'Dr. P. K. Rao',
          facultyStatus: 'Verified'
        },
        {
          code: '24CSE0101',
          name: 'Programming in C & Problem Solving',
          shortName: 'C-Prog',
          credits: 4,
          internalMarks: '49 / 50',
          internalPct: 98,
          grade: 'O',
          gradePoint: 10,
          faculty: 'Prof. R. Sharma',
          facultyStatus: 'Verified'
        },
        {
          code: '24ECE0102',
          name: 'Digital Electronics & Logic Design',
          shortName: 'Digital Logic',
          credits: 4,
          internalMarks: '44 / 50',
          internalPct: 88,
          grade: 'A',
          gradePoint: 8,
          faculty: 'Dr. S. K. Narayan',
          facultyStatus: 'Verified'
        },
        {
          code: '24PHY0101',
          name: 'Engineering Physics & Optics',
          shortName: 'Physics',
          credits: 4,
          internalMarks: '46 / 50',
          internalPct: 92,
          grade: 'A+',
          gradePoint: 9,
          faculty: 'Dr. Anita Roy',
          facultyStatus: 'Verified'
        },
        {
          code: '24HUM0101',
          name: 'Professional Communication Skills',
          shortName: 'Comm Skills',
          credits: 3,
          internalMarks: '48 / 50',
          internalPct: 96,
          grade: 'O',
          gradePoint: 10,
          faculty: 'Dr. Neha Verma',
          facultyStatus: 'Verified'
        },
        {
          code: '24CSE0102',
          name: 'Programming Lab in C',
          shortName: 'C Lab',
          credits: 3,
          internalMarks: '49 / 50',
          internalPct: 98,
          grade: 'O',
          gradePoint: 10,
          faculty: 'Er. A. Patel',
          facultyStatus: 'Verified'
        }
      ]
    },
    { 
      id: 2,
      sem: 'Semester II', 
      term: 'Spring 2026',
      sgpa: '9.50', 
      credits: '24 / 24', 
      status: 'Passed (Outstanding)',
      courses: [
        {
          code: '24MTH0102',
          name: 'Engineering Mathematics II',
          shortName: 'Math-II',
          credits: 4,
          internalMarks: '48 / 50',
          internalPct: 96,
          grade: 'O',
          gradePoint: 10,
          faculty: 'Dr. P. K. Rao',
          facultyStatus: 'Verified'
        },
        {
          code: '24CSE0103',
          name: 'Data Structures & Algorithms',
          shortName: 'DSA',
          credits: 4,
          internalMarks: '50 / 50',
          internalPct: 100,
          grade: 'O',
          gradePoint: 10,
          faculty: 'Prof. R. Sharma',
          facultyStatus: 'Verified'
        },
        {
          code: '24CSE0104',
          name: 'Computer Organization & Architecture',
          shortName: 'COA',
          credits: 4,
          internalMarks: '45 / 50',
          internalPct: 90,
          grade: 'A+',
          gradePoint: 9,
          faculty: 'Dr. V. Gupta',
          facultyStatus: 'Verified'
        },
        {
          code: '24ECE0103',
          name: 'Fundamentals of Electrical Engineering (FEE)',
          shortName: 'FEE',
          credits: 4,
          internalMarks: '46 / 50',
          internalPct: 92,
          grade: 'A+',
          gradePoint: 9,
          faculty: 'Dr. S. K. Narayan',
          facultyStatus: 'Verified'
        },
        {
          code: '24EVS0101',
          name: 'Environmental Science & Sustainability',
          shortName: 'EVS',
          credits: 4,
          internalMarks: '47 / 50',
          internalPct: 94,
          grade: 'O',
          gradePoint: 10,
          faculty: 'Dr. M. Sen',
          facultyStatus: 'Verified'
        },
        {
          code: '24CSE0105',
          name: 'Data Structures Lab in C++',
          shortName: 'DSA Lab',
          credits: 4,
          internalMarks: '50 / 50',
          internalPct: 100,
          grade: 'O',
          gradePoint: 10,
          faculty: 'Er. A. Patel',
          facultyStatus: 'Verified'
        }
      ]
    },
    { 
      id: 3,
      sem: 'Semester III (Current)', 
      term: 'Autumn 2026',
      sgpa: '9.35 (Est)', 
      credits: '24 (In Progress)', 
      status: 'On Track',
      courses: [
        {
          code: '24CSE0209',
          name: 'Database Management Systems',
          shortName: 'DBMS',
          credits: 4,
          internalMarks: '48 / 50',
          internalPct: 96,
          grade: 'A+',
          gradePoint: 9,
          faculty: 'Prof. R. Sharma',
          facultyStatus: 'Approved & Active'
        },
        {
          code: '24CSE0210',
          name: 'Object Oriented Programming',
          shortName: 'OOPS',
          credits: 4,
          internalMarks: '49 / 50',
          internalPct: 98,
          grade: 'O',
          gradePoint: 10,
          faculty: 'Dr. Neha Verma',
          facultyStatus: 'Approved & Active'
        },
        {
          code: '24MTH0104',
          name: 'Discrete Structures & Combinatorics',
          shortName: 'Discrete Structures',
          credits: 4,
          internalMarks: '45 / 50',
          internalPct: 90,
          grade: 'A+',
          gradePoint: 9,
          faculty: 'Dr. V. Gupta',
          facultyStatus: 'Approved & Active'
        },
        {
          code: '24CSE0211',
          name: 'Operating Systems & System Programming',
          shortName: 'OS',
          credits: 4,
          internalMarks: '46 / 50',
          internalPct: 92,
          grade: 'A+',
          gradePoint: 9,
          faculty: 'Dr. Lakshita',
          facultyStatus: 'Approved & Active'
        },
        {
          code: '24AIM0101',
          name: 'AI & Machine Learning Fundamentals',
          shortName: 'AI & ML',
          credits: 4,
          internalMarks: '44 / 50',
          internalPct: 88,
          grade: 'A',
          gradePoint: 8,
          faculty: 'Dr. S. K. Narayan',
          facultyStatus: 'Approved & Active'
        },
        {
          code: '24CSE0212',
          name: 'Database & OOPS Integrated Practicum',
          shortName: 'DBMS/OOPS Lab',
          credits: 4,
          internalMarks: '49 / 50',
          internalPct: 98,
          grade: 'O',
          gradePoint: 10,
          faculty: 'Er. A. Patel',
          facultyStatus: 'Approved & Active'
        }
      ]
    }
  ];

  // Helper function for grade badge colors
  const getGradeBadgeStyle = (grade) => {
    switch (grade) {
      case 'O':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        };
      case 'A+':
        return {
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          color: '#3b82f6',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        };
      case 'A':
        return {
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          color: '#8b5cf6',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        };
      case 'B+':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          color: '#f59e0b',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        };
      default:
        return {
          backgroundColor: 'var(--bg-subtle)',
          color: 'var(--text-main)',
          border: '1px solid var(--border-color)'
        };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Academic Overview Cards */}
      <div className="flex-row-3">
        <div className="dashboard-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <span className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600 }}>CUMULATIVE CGPA</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-heading)', marginTop: '4px' }}>
            9.35
          </div>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Top 5% in CSE Department</span>
        </div>

        <div className="dashboard-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
          <span className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600 }}>TOTAL CREDITS EARNED</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-heading)', marginTop: '4px' }}>
            46 / 160
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+24 In Progress (Degree: 43.8%)</span>
        </div>

        <div className="dashboard-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <span className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600 }}>HONORS ROLL</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={24} /> Dean's List 2025-26
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Consistent Distinction Holder</span>
        </div>
      </div>

      {/* Semester Grade History with Expandable Accordions */}
      <div className="dashboard-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 className="heading-md" style={{ margin: 0 }}>Semester Grade History</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '4px', margin: 0 }}>
              Click any semester row to expand subjects, credit points, internal marks, grades, and faculty status.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setExpandedSemesters({ 1: true, 2: true, 3: true })}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '5px 10px' }}
            >
              Expand All
            </button>
            <button
              onClick={() => setExpandedSemesters({})}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '5px 10px' }}
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* List of Semester Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {semesters.map((s) => {
            const isExpanded = !!expandedSemesters[s.id];

            return (
              <div 
                key={s.id}
                style={{
                  border: `1px solid ${isExpanded ? 'var(--primary)' : 'var(--border-color)'}`,
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-card)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: isExpanded ? '0 4px 14px rgba(37, 99, 235, 0.08)' : 'none'
                }}
              >
                {/* Clickable Header Row */}
                <div 
                  onClick={() => toggleSemester(s.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    backgroundColor: isExpanded ? 'var(--bg-subtle)' : 'transparent',
                    transition: 'background-color 0.15s ease',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: isExpanded ? 'var(--primary)' : 'var(--bg-subtle)',
                      color: isExpanded ? '#ffffff' : 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                          {s.sem}
                        </span>
                        <span className="badge" style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                          {s.term}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {s.courses.length} Registered Courses • {s.credits}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                        SGPA
                      </span>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)' }}>
                        {s.sgpa}
                      </span>
                    </div>

                    <span className="badge" style={{ 
                      backgroundColor: s.status.includes('Passed') ? 'rgba(16, 185, 129, 0.12)' : 'rgba(59, 130, 246, 0.12)', 
                      color: s.status.includes('Passed') ? '#10b981' : '#3b82f6',
                      fontWeight: 700,
                      padding: '6px 12px',
                      fontSize: '0.8rem'
                    }}>
                      {s.status}
                    </span>
                  </div>
                </div>

                {/* Expanded Accordion Body */}
                {isExpanded && (
                  <div style={{
                    padding: '20px',
                    borderTop: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)'
                  }}>
                    {/* Quick highlights bar */}
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      flexWrap: 'wrap',
                      marginBottom: '16px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-subtle)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}>
                      <span>Total Subjects: <strong style={{ color: 'var(--text-main)' }}>{s.courses.length}</strong></span>
                      <span>•</span>
                      <span>Credits: <strong style={{ color: 'var(--text-main)' }}>{s.credits}</strong></span>
                      <span>•</span>
                      <span>Key Highlights: <strong style={{ color: '#10b981' }}>{s.courses.filter(c => c.grade === 'O').length} Outstanding (O)</strong>, <strong style={{ color: '#3b82f6' }}>{s.courses.filter(c => c.grade === 'A+').length} Distinction (A+)</strong></span>
                    </div>

                    {/* Responsive Subject Breakdown Table */}
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                        <thead>
                          <tr style={{
                            borderBottom: '1px solid var(--border-color)',
                            color: 'var(--text-muted)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            <th style={{ padding: '10px 14px' }}>Course Code & Title</th>
                            <th style={{ padding: '10px 14px' }}>Credits</th>
                            <th style={{ padding: '10px 14px' }}>Internal Assessment</th>
                            <th style={{ padding: '10px 14px' }}>End-Term Grade</th>
                            <th style={{ padding: '10px 14px' }}>Faculty & Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {s.courses.map((course, cIdx) => {
                            const badgeStyle = getGradeBadgeStyle(course.grade);

                            return (
                              <tr 
                                key={cIdx}
                                style={{ 
                                  borderBottom: cIdx === s.courses.length - 1 ? 'none' : '1px solid var(--border-color)',
                                  transition: 'background-color 0.15s ease'
                                }}
                              >
                                {/* Course Code & Title */}
                                <td style={{ padding: '12px 14px' }}>
                                  <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>
                                    {course.name}
                                  </div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                    <code>{course.code}</code> • {course.shortName}
                                  </div>
                                </td>

                                {/* Credits */}
                                <td style={{ padding: '12px 14px', fontWeight: 600 }}>
                                  <span style={{ 
                                    padding: '3px 8px', 
                                    borderRadius: '6px', 
                                    backgroundColor: 'var(--bg-subtle)', 
                                    fontSize: '0.78rem',
                                    fontWeight: 700
                                  }}>
                                    {course.credits} Credits
                                  </span>
                                </td>

                                {/* Internal Assessment Marks */}
                                <td style={{ padding: '12px 14px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--text-heading)' }}>
                                      {course.internalMarks}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                                      ({course.internalPct}%)
                                    </span>
                                  </div>
                                  <div style={{ 
                                    width: '100px', 
                                    height: '5px', 
                                    backgroundColor: 'var(--bg-subtle)', 
                                    borderRadius: '3px', 
                                    marginTop: '4px',
                                    overflow: 'hidden' 
                                  }}>
                                    <div style={{ 
                                      width: `${course.internalPct}%`, 
                                      height: '100%', 
                                      backgroundColor: course.internalPct >= 95 ? '#10b981' : '#3b82f6',
                                      borderRadius: '3px'
                                    }} />
                                  </div>
                                </td>

                                {/* End-Term Grade (e.g. DBMS: A+, OOPS: O) */}
                                <td style={{ padding: '12px 14px' }}>
                                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <span 
                                      style={{
                                        ...badgeStyle,
                                        fontWeight: 900,
                                        fontSize: '0.85rem',
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        display: 'inline-block',
                                        minWidth: '36px',
                                        textAlign: 'center'
                                      }}
                                    >
                                      {course.grade}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                      ({course.gradePoint} GP)
                                    </span>
                                  </div>
                                </td>

                                {/* Faculty Status */}
                                <td style={{ padding: '12px 14px' }}>
                                  <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.825rem' }}>
                                    {course.faculty}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#10b981', marginTop: '2px' }}>
                                    <CheckCircle2 size={13} />
                                    <span>{course.facultyStatus}</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
