import React, { memo } from 'react';
import { X, Filter, CheckCircle2 } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const BookingFilterModal: React.FC<FilterModalProps> = memo(({ isOpen, onClose, onApply }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '500px',
        padding: '32px',
        position: 'relative',
        animation: 'modalScale 0.3s ease-out',
        boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Filter size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-title)' }}>Filter Logs</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Refine your service records search.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Status Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-title)' }}>Service Status</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Active', 'Pending', 'Completed', 'Cancelled'].map(status => (
                <button key={status} style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: status === 'Active' ? 'var(--grad-primary)' : 'var(--bg-card)',
                  color: status === 'Active' ? 'white' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}>
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-title)' }}>Time Range</label>
            <input type="date" className="form-input" style={{ marginBottom: '12px' }} />
          </div>

          {/* Tech Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-title)' }}>Technician Group</label>
            <select className="form-input">
              <option>All Technicians</option>
              <option>Alex Rivera</option>
              <option>Maria Garcia</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
          <button className="secondary-btn" style={{ flex: 1 }} onClick={onClose}>Reset All</button>
          <button className="primary-btn" style={{ flex: 1.5 }} onClick={() => { onApply({}); onClose(); }}>
            <CheckCircle2 size={18} />
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
});

export default BookingFilterModal;
