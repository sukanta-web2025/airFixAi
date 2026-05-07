import React, { useState, memo } from 'react';
import { 
  User, 
  Mail, 
  X,
  Save
} from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    email: string;
  };
  onSave: (data: any) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = memo(({ 
  isOpen, 
  onClose, 
  userData,
  onSave 
}) => {
  const [formData, setFormData] = useState(userData);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(10, 14, 42, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      animation: 'fadeIn 0.2s ease-out',
      willChange: 'opacity'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '550px',
        background: 'var(--bg-card)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        padding: '40px',
        position: 'relative',
        boxShadow: 'var(--card-shadow)',
        animation: 'modalScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#A0AEC0',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '50%',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7FAFC')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-title)' }}>Edit Profile</h3>
          <p style={{ color: 'var(--text-main)', opacity: 0.6, fontSize: '0.9rem', marginTop: '4px' }}>Update your personal information and preferences.</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-main)', opacity: 0.5 }}>
                <User size={18} />
              </div>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 45px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-page)',
                  color: 'var(--text-title)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-main)', opacity: 0.5 }}>
                <Mail size={18} />
              </div>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 45px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-page)',
                  color: 'var(--text-title)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
            <button 
              type="button"
              onClick={onClose}
              className="action-btn-zoom"
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-page)',
                color: 'var(--text-main)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >Cancel</button>
            <button 
              type="submit"
              className="primary-btn action-btn-zoom"
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 16px rgba(139, 92, 246, 0.2)'
              }}
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditProfileModal;
