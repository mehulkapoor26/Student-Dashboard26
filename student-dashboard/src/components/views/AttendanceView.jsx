import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  Calculator, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus,
  ShieldCheck
} from 'lucide-react';

export default function AttendanceView() {
  // State for all subjects with single simulation parameter (simDelta)
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Database Management Systems',
      shortName: 'DBMS',
      code: '24CSE0209',
      faculty: 'Prof. R. Sharma',
      room: 'LT-302',
      present: 36,
      absent: 2,
      leave: 2,
      simDelta: 0
    },
    {
      id: 2,
      name: 'Discrete Structures',
      shortName: 'Discrete Structures',
      code: '24MTH0104',
      faculty: 'Dr. V. Gupta',
      room: 'CS-Lab 4',
      present: 30,
      absent: 4,
      leave: 2,
      simDelta: 0
    },
    {
      id: 3,
      name: 'Object Oriented Programming',
      shortName: 'OOPS',
      code: '24CSE0210',
      faculty: 'Dr. Neha Verma',
      room: 'LT-104',
      present: 33,
      absent: 5,
      leave: 2,
      simDelta: 0
    },
    {
      id: 4,
      name: 'Fundamentals of Electrical Engineering',
      shortName: 'FEE',
      code: '24CSE0211',
      faculty: 'Dr. S. K. Narayan',
      room: 'Web-Lab',
      present: 29,
      absent: 3,
      leave: 2,
      simDelta: 0
    }
  ]);

  // Calculate stats for a given subject based on simDelta (+ attend, - skip)
  const calculateSubjectStats = (s) => {
    const baseTotal = s.present + s.absent + s.leave;
    const baseAttended = s.present + s.leave;
    const currentPercentage = baseTotal > 0 ? ((baseAttended / baseTotal) * 100).toFixed(1) : '100.0';

    const delta = Number(s.simDelta) || 0;
    let projectedAttended = baseAttended;
    let projectedTotal = baseTotal;

    if (delta > 0) {
      // Attending upcoming classes
      projectedAttended += delta;
      projectedTotal += delta;
    } else if (delta < 0) {
      // Skipping/bunking upcoming classes (classes happen, but student missed them)
      projectedTotal += Math.abs(delta);
    }

    const projectedPercentage = projectedTotal > 0 
      ? ((projectedAttended / projectedTotal) * 100).toFixed(1) 
      : '100.0';

    const pctDiff = (parseFloat(projectedPercentage) - parseFloat(currentPercentage)).toFixed(1);

    // Safe bunks margin: how many classes can be skipped without dropping below 75%
    // (projectedAttended) / (projectedTotal + x) >= 0.75  =>  x <= (4*projectedAttended - 3*projectedTotal)/3
    const safeBunks = Math.max(0, Math.floor((4 * projectedAttended - 3 * projectedTotal) / 3));

    // If below 75%, how many consecutive classes must be attended to cross 75%
    // (projectedAttended + y) / (projectedTotal + y) >= 0.75  =>  y >= 3*projectedTotal - 4*projectedAttended
    const neededToCross75 = parseFloat(projectedPercentage) < 75 
      ? Math.max(0, Math.ceil(3 * projectedTotal - 4 * projectedAttended)) 
      : 0;

    return {
      baseTotal,
      baseAttended,
      currentPercentage: parseFloat(currentPercentage),
      projectedPercentage: parseFloat(projectedPercentage),
      pctDiff: parseFloat(pctDiff),
      safeBunks,
      neededToCross75,
      simDelta: delta
    };
  };

  // Overall attendance across all subjects combined
  const overallCurrentAttended = subjects.reduce((acc, s) => acc + s.present + s.leave, 0);
  const overallCurrentTotal = subjects.reduce((acc, s) => acc + s.present + s.absent + s.leave, 0);
  const overallCurrentPercentage = overallCurrentTotal > 0 
    ? ((overallCurrentAttended / overallCurrentTotal) * 100).toFixed(1) 
    : '100.0';

  // Overall projected after simulation deltas
  const overallProjectedStats = subjects.reduce((acc, s) => {
    const delta = Number(s.simDelta) || 0;
    acc.attended += s.present + s.leave + (delta > 0 ? delta : 0);
    acc.total += s.present + s.absent + s.leave + Math.abs(delta);
    return acc;
  }, { attended: 0, total: 0 });

  const overallProjectedPercentage = overallProjectedStats.total > 0
    ? ((overallProjectedStats.attended / overallProjectedStats.total) * 100).toFixed(1)
    : '100.0';

  // Overall safe bunk margin across all registered subjects
  const overallSafeBunks = Math.max(0, Math.floor((4 * overallProjectedStats.attended - 3 * overallProjectedStats.total) / 3));

  // Adjust simulation delta (+ / -) in a single control
  const handleAdjustSim = (subjectId, change) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== subjectId) return s;
      return { ...s, simDelta: (s.simDelta || 0) + change };
    }));
  };

  // Set simulation delta directly
  const handleSetSim = (subjectId, val) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== subjectId) return s;
      return { ...s, simDelta: val };
    }));
  };

  // Reset all simulation to 0
  const handleResetAll = () => {
    setSubjects(prev => prev.map(s => ({ ...s, simDelta: 0 })));
  };

  const anySimActive = subjects.some(s => s.simDelta !== 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner: Overall vs Projected Attendance Summary */}
      <div className="flex-row-3">
        {/* Current Overall */}
        <div className="dashboard-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <span className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
            CURRENT OVERALL ATTENDANCE
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '4px' }}>
            {overallCurrentPercentage}%
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {overallCurrentAttended} of {overallCurrentTotal} classes across 4 subjects
          </span>
        </div>

        {/* Projected Overall after Simulation */}
        <div className="dashboard-card" style={{ borderLeft: `4px solid ${overallProjectedPercentage >= 75 ? '#10b981' : '#ef4444'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
              PROJECTED OVERALL
            </span>
            {anySimActive && (
              <span className="badge" style={{ 
                backgroundColor: overallProjectedPercentage >= overallCurrentPercentage ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: overallProjectedPercentage >= overallCurrentPercentage ? '#10b981' : '#ef4444',
                fontSize: '0.7rem'
              }}>
                {overallProjectedPercentage >= overallCurrentPercentage ? '▲ Increasing' : '▼ Decreasing'}
              </span>
            )}
          </div>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 800, 
            color: overallProjectedPercentage >= 75 ? '#10b981' : '#ef4444', 
            marginTop: '4px' 
          }}>
            {overallProjectedPercentage}%
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {anySimActive ? `${overallProjectedStats.attended} of ${overallProjectedStats.total} classes projected` : 'No upcoming classes simulated'}
          </span>
        </div>

        {/* Safe Bunk Margin / Bunk Calculator Card */}
        <div className="dashboard-card" style={{ borderLeft: '4px solid #f59e0b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                SAFE BUNK MARGIN
              </span>
              <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#d97706', fontSize: '0.7rem', fontWeight: 700 }}>
                Bunk Calculator
              </span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '4px' }}>
              +{overallSafeBunks} Classes
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Can safely skip across courses without dropping below 75%
            </span>
          </div>
          {anySimActive && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={handleResetAll}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '4px 10px', gap: '4px' }}
              >
                <RotateCcw size={12} /> Reset Simulation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subject Cards with Bunk Calculator & Simulator */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {subjects.map(subject => {
          const stats = calculateSubjectStats(subject);
          const isProjectedSafe = stats.projectedPercentage >= 75;

          return (
            <div 
              key={subject.id}
              className="dashboard-card"
              style={{
                borderLeft: `5px solid ${stats.currentPercentage >= 75 ? '#10b981' : '#ef4444'}`,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px'
              }}
            >
              {/* Header: Subject info & Percentage badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h3 className="heading-md" style={{ margin: 0, fontSize: '1.2rem' }}>
                      {subject.name}
                    </h3>
                    <span className="badge" style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-main)' }}>
                      {subject.code}
                    </span>
                    <span className="badge" style={{ 
                      backgroundColor: stats.currentPercentage >= 75 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
                      color: stats.currentPercentage >= 75 ? '#10b981' : '#ef4444' 
                    }}>
                      {stats.currentPercentage >= 75 ? 'Safe (>75%)' : 'Detention Risk (<75%)'}
                    </span>
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                    Faculty: <strong>{subject.faculty}</strong> • Location: <strong>{subject.room}</strong>
                  </p>
                </div>

                {/* Subject Attendance Percentage Pill */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  backgroundColor: stats.simDelta !== 0 ? (stats.pctDiff >= 0 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)') : 'var(--bg-subtle)',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${stats.simDelta !== 0 ? (stats.pctDiff >= 0 ? '#10b981' : '#ef4444') : 'var(--border-color)'}`
                }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                      {stats.simDelta !== 0 ? 'Projected' : 'Current'}
                    </span>
                    <span style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 800, 
                      color: stats.simDelta !== 0 ? (stats.projectedPercentage >= 75 ? '#10b981' : '#ef4444') : 'var(--text-heading)' 
                    }}>
                      {stats.simDelta !== 0 ? `${stats.projectedPercentage}%` : `${stats.currentPercentage}%`}
                    </span>
                  </div>

                  {stats.simDelta !== 0 && (
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 800, 
                      color: stats.pctDiff >= 0 ? '#10b981' : '#ef4444',
                      backgroundColor: 'var(--bg-card)',
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}>
                      {stats.pctDiff >= 0 ? `+${stats.pctDiff}%` : `${stats.pctDiff}%`}
                    </span>
                  )}
                </div>
              </div>

              {/* Bunk Calculator Box: Safe Bunk Margin & Simulation */}
              <div style={{ 
                backgroundColor: 'var(--bg-subtle)', 
                borderRadius: '12px', 
                padding: '16px 20px', 
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calculator size={18} style={{ color: 'var(--primary)' }} />
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-heading)' }}>
                      Bunk Calculator & Safe Margin
                    </strong>
                  </div>
                  <span className="badge" style={{ 
                    backgroundColor: isProjectedSafe ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
                    color: isProjectedSafe ? '#10b981' : '#ef4444',
                    fontWeight: 700,
                    fontSize: '0.75rem'
                  }}>
                    {stats.safeBunks > 0 ? `+${stats.safeBunks} Safe Bunks` : `${stats.neededToCross75} Lectures Needed`}
                  </span>
                </div>

                {/* Safe Bunk Margin Alert / Statement */}
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: isProjectedSafe ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                  border: `1px solid ${isProjectedSafe ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {isProjectedSafe ? (
                    <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                  ) : (
                    <AlertTriangle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
                  )}
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                    {stats.safeBunks > 0 ? (
                      <span>
                        You can safely skip <strong style={{ color: '#10b981', fontSize: '0.95rem' }}>{stats.safeBunks} more {subject.shortName || subject.name} lectures</strong> without dropping below 75%.
                      </span>
                    ) : stats.projectedPercentage >= 75 ? (
                      <span>
                        You are right at 75%. You <strong>cannot skip</strong> any more {subject.shortName || subject.name} lectures without risking detention.
                      </span>
                    ) : (
                      <span>
                        Detention Warning! Attendance is {stats.projectedPercentage}% (&lt; 75%). You must attend <strong style={{ color: '#ef4444', fontSize: '0.95rem' }}>{stats.neededToCross75} more consecutive {subject.shortName || subject.name} lectures</strong> to reach 75%.
                      </span>
                    )}
                  </div>
                </div>

                {/* Single Combined +/- Stepper */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    background: 'var(--bg-card)',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      Simulate Bunks / Lectures:
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => handleAdjustSim(subject.id, -1)}
                        title="Skip 1 lecture (-)"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: stats.simDelta < 0 ? '#ef4444' : 'var(--bg-subtle)',
                          color: stats.simDelta < 0 ? '#ffffff' : 'var(--text-main)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Minus size={16} />
                      </button>

                      <div style={{
                        minWidth: '105px',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        backgroundColor: stats.simDelta > 0 ? 'rgba(16, 185, 129, 0.12)' : stats.simDelta < 0 ? 'rgba(239, 68, 68, 0.12)' : 'var(--bg-subtle)',
                        border: `1px solid ${stats.simDelta > 0 ? '#10b981' : stats.simDelta < 0 ? '#ef4444' : 'var(--border-color)'}`,
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ 
                          fontWeight: 800, 
                          fontSize: '0.95rem', 
                          color: stats.simDelta > 0 ? '#10b981' : stats.simDelta < 0 ? '#ef4444' : 'var(--text-heading)' 
                        }}>
                          {stats.simDelta > 0 ? `+${stats.simDelta} Attend` : stats.simDelta < 0 ? `${stats.simDelta} Skip` : '0 (Live)'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdjustSim(subject.id, 1)}
                        title="Attend 1 lecture (+)"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: stats.simDelta > 0 ? '#10b981' : 'var(--bg-subtle)',
                          color: stats.simDelta > 0 ? '#ffffff' : 'var(--text-main)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {stats.simDelta !== 0 && (
                    <button
                      onClick={() => handleSetSim(subject.id, 0)}
                      className="btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '6px 12px', gap: '4px' }}
                    >
                      <RotateCcw size={12} /> Reset to Live
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom Quick Breakdown row */}
              <div style={{ 
                display: 'flex', 
                gap: '14px', 
                flexWrap: 'wrap', 
                fontSize: '0.8rem', 
                color: 'var(--text-muted)',
                paddingTop: '6px',
                borderTop: '1px solid var(--border-color)'
              }}>
                <span>Present: <strong style={{ color: '#10b981' }}>{subject.present}</strong></span>
                <span>•</span>
                <span>Absent: <strong style={{ color: '#ef4444' }}>{subject.absent}</strong></span>
                <span>•</span>
                <span>Leave: <strong style={{ color: '#f59e0b' }}>{subject.leave}</strong></span>
                <span>•</span>
                <span>Total Till Date: <strong style={{ color: 'var(--text-heading)' }}>{subject.present + subject.absent + subject.leave}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
