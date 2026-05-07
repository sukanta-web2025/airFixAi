import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, MapPin, Wrench, Calendar, Clock, Clipboard } from 'lucide-react';

const AddBookingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button 
          onClick={() => navigate(-1)}
          className="hover-glass"
          style={{ 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-color)', 
            padding: '12px', 
            borderRadius: '12px', 
            color: 'var(--text-title)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
            New Service <span className="gradient-text">Ticket</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600, marginTop: '4px' }}>Create a fresh maintenance log for AirFix AI.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px' }}>
        {/* Main Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Customer Info */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 150, 255, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>Client Identity</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="e.g. Robert Fox" />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Service Address</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }} />
                  <input type="text" className="form-input" style={{ paddingLeft: '48px' }} placeholder="Search for property address..." />
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wrench size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>Diagnosis & Care</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label className="form-label">Service Type</label>
                <select className="form-input">
                  <option>Periodic Maintenance</option>
                  <option>Diagnostic Repair</option>
                  <option>Unit Installation</option>
                  <option>Emergency Fix</option>
                </select>
              </div>
              <div>
                <label className="form-label">AC Unit Model</label>
                <input type="text" className="form-input" placeholder="e.g. Split Inverter 1.5T" />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Incident Description</label>
                <textarea 
                  className="form-input" 
                  style={{ minHeight: '120px', resize: 'vertical' }} 
                  placeholder="Describe the noise, leakage, or cooling issues in detail..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 140, 0, 0.1)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', margin: 0 }}>Schedule</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Target Date</label>
                <input type="date" className="form-input" />
              </div>
              <div>
                <label className="form-label">Priority Level</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Low', 'Medium', 'High'].map(p => (
                    <button key={p} style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: p === 'High' ? 'var(--color-danger)' : 'var(--bg-card)',
                      color: p === 'High' ? 'white' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}>{p}</button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
              <button 
                className="primary-btn" 
                style={{ width: '100%', padding: '16px' }}
                onClick={() => navigate('/admin/bookings')}
              >
                <Save size={18} />
                Confirm & Create
              </button>
              <button 
                className="secondary-btn" 
                style={{ width: '100%', marginTop: '12px', padding: '16px' }}
                onClick={() => navigate(-1)}
              >
                Discard Draft
              </button>
            </div>
          </div>

          <div 
            style={{ 
              background: 'linear-gradient(135deg, #0096FF 0%, #00D2FF 100%)',
              padding: '28px',
              borderRadius: '24px',
              color: 'white'
            }}
          >
            <Clipboard size={32} style={{ marginBottom: '16px', opacity: 0.8 }} />
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 800 }}>Quick Tip</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5', opacity: 0.9 }}>
              Providing the exact AC model helps our technicians carry the right spare parts, reducing repair time by 40%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookingPage;
