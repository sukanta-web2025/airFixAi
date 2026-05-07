import React, { useState, memo } from 'react';
import { 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  X
} from 'lucide-react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = memo(({ isOpen, onClose }) => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: 'var(--bg-card)',
        backdropFilter: 'blur(30px) saturate(150%)',
        borderRadius: '30px',
        padding: '40px',
        position: 'relative',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
        animation: 'modalScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '12px',
            transition: 'all 0.2s'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(0, 150, 255, 0.1)',
            color: 'var(--color-primary)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <ShieldCheck size={40} />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-0.5px' }}>Change Password</h3>
          <p style={{ color: 'var(--text-main)', opacity: 0.8, fontSize: '0.95rem', marginTop: '4px' }}>Secure your account credentials.</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="flex-column gap-2">
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', marginLeft: '4px' }}>Current Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showOld ? 'text' : 'password'}
                placeholder="••••••••"
                className="form-input"
              />
              <button 
                type="button"
                onClick={() => setShowOld(!showOld)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex-column gap-2">
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', marginLeft: '4px' }}>New Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showNew ? 'text' : 'password'}
                placeholder="••••••••"
                className="form-input"
              />
              <button 
                type="button"
                onClick={() => setShowNew(!showNew)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex-column gap-2">
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', marginLeft: '4px' }}>Confirm New Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                className="form-input"
              />
              <button 
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <button 
              type="button"
              onClick={onClose}
              className="secondary-btn"
              style={{ flex: 1, padding: '14px' }}
            >Cancel</button>
            <button 
              type="submit"
              className="primary-btn"
              style={{ flex: 1, padding: '14px' }}
            >Update My Credentials</button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default ChangePasswordModal;
