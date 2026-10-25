import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle, ShieldCheck } from 'lucide-react';

export default function FeeView() {
  const transactions = [
    { id: 'TXN-99812', term: 'Semester III Tuition Fee', date: '01 Jul 2026', amount: '₹1,25,000', status: 'PAID' },
    { id: 'TXN-88210', term: 'Hostel & Mess Charges', date: '05 Jul 2026', amount: '₹45,000', status: 'PAID' },
    { id: 'TXN-77192', term: 'Exam & Lab Security Fee', date: '10 Jul 2026', amount: '₹8,500', status: 'PAID' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Fee Summary Cards */}
      <div className="flex-row-3">
        <div className="dashboard-card" style={{ borderLeft: '4px solid #10b981' }}>
          <span className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600 }}>PAID THIS SEMESTER</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '4px' }}>
            ₹1,78,500
          </div>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>All dues cleared</span>
        </div>

        <div className="dashboard-card" style={{ borderLeft: '4px solid #3b82f6' }}>
          <span className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600 }}>OUTSTANDING BALANCE</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '4px' }}>
            ₹0.00
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Next due date: Jan 2027</span>
        </div>

        <div className="dashboard-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
          <span className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600 }}>FINANCIAL STATUS</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={22} /> Fee Clearance Verified
          </div>
        </div>
      </div>

      {/* Payment Receipts History */}
      <div className="dashboard-card">
        <h3 className="heading-md" style={{ marginBottom: '16px' }}>Fee Payment Transactions</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {transactions.map(t => (
            <div key={t.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '10px',
              border: '1px solid var(--border-color)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)' }}>{t.term}</h4>
                  <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>{t.status}</span>
                </div>
                <p className="text-muted" style={{ fontSize: '0.78rem', marginTop: '2px' }}>Txn ID: {t.id} • Date: {t.date}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)' }}>{t.amount}</span>
                <button 
                  onClick={() => alert(`Downloading official fee receipt for ${t.id}`)}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <Download size={14} /> Receipt PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
