import React, { useState } from 'react';
import { Home, Utensils, ShieldAlert, KeyRound, CheckCircle2, Clock } from 'lucide-react';

export default function HostelView() {
  const [gatePassSubmitted, setGatePassSubmitted] = useState(false);

  const messMenu = [
    { day: 'Monday', breakfast: 'Aloo Paratha, Curd, Tea', lunch: 'Rajma Chawal, Roti, Salad', dinner: 'Paneer Butter Masala, Rice, Dal' },
    { day: 'Tuesday', breakfast: 'Idli Sambar, Coconut Chutney', lunch: 'Kadi Chawal, Mix Veg, Roti', dinner: 'Egg Curry / Malai Kofta, Rice' },
    { day: 'Wednesday', breakfast: 'Poha, Sprouted Moong, Milk', lunch: 'Chole Bhature, Boondi Raita', dinner: 'Dal Tadka, Seasonal Veg, Rice' },
    { day: 'Thursday', breakfast: 'Uttapam, Sambar, Coffee', lunch: 'Aloo Gobi, Dal Makhani, Roti', dinner: 'Shahi Paneer, Jeera Rice, Gulab Jamun' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Room Details Banner */}
      <div className="dashboard-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>HOSTEL BLOCK</span>
          <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-heading)', marginTop: '2px' }}>Aryabhata Boys Hostel (Block B)</p>
        </div>
        <div>
          <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>ROOM NO.</span>
          <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)', marginTop: '2px' }}>B-304 (3rd Floor)</p>
        </div>
        <div>
          <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>ROOMMATE</span>
          <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-heading)', marginTop: '2px' }}>Aarav Sharma (CSE)</p>
        </div>
        <div>
          <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>WARDEN CONTACT</span>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)', marginTop: '2px' }}>Prof. M. K. Rao (+91 9911223344)</p>
        </div>
      </div>

      {/* Mess Schedule & Out-Pass Form */}
      <div className="flex-row-2">
        
        {/* Weekly Mess Menu */}
        <div className="dashboard-card">
          <h3 className="heading-md" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Utensils size={18} style={{ color: 'var(--primary)' }} /> Weekly Mess Schedule
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messMenu.map((m, idx) => (
              <div key={idx} style={{ padding: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>{m.day}</h4>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.8rem' }}>
                  <div><strong>Breakfast:</strong> <span className="text-muted">{m.breakfast}</span></div>
                  <div><strong>Lunch:</strong> <span className="text-muted">{m.lunch}</span></div>
                  <div><strong>Dinner:</strong> <span className="text-muted">{m.dinner}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Online Gate Pass Request */}
        <div className="dashboard-card" style={{ background: 'var(--hero-bg)', border: '1px solid var(--hero-border)' }}>
          <h3 className="heading-md" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <KeyRound size={18} style={{ color: 'var(--primary)' }} /> Digital Gate Out-Pass
          </h3>
          <p className="text-muted" style={{ fontSize: '0.825rem', marginBottom: '16px' }}>
            Request instant warden approval for weekend leave or night out.
          </p>

          {gatePassSubmitted ? (
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '14px', borderRadius: '10px', color: '#10b981', fontWeight: 700, textAlign: 'center', fontSize: '0.875rem' }}>
              <CheckCircle2 size={24} style={{ display: 'block', margin: '0 auto 6px' }} />
              Gate Pass Approved! QR Code sent to your mobile.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="Reason for leaving campus" style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.85rem' }} />
              <input type="date" style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.85rem' }} />
              <button 
                className="btn-primary" 
                onClick={() => setGatePassSubmitted(true)} 
                style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
              >
                Apply Gate Pass
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
