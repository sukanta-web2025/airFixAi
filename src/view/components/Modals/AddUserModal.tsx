import React, { useState, memo, useEffect } from 'react';
import {
  UserPlus,
  User,
  Mail,
  Shield,
  X,
  Save,
  Check,
  Edit2
} from 'lucide-react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
  initialData?: any;
}

const AddUserModal: React.FC<AddUserModalProps> = memo(({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Seeking Service'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          email: initialData.email || '',
          role: initialData.role || 'Seeking Service'
        });
      } else {
        setFormData({ name: '', email: '', role: 'Seeking Service' });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onSave({
      ...(initialData || {}),
      ...formData,
      id: initialData?.id || Date.now(),
      status: initialData?.status || 'Active',
      joined: initialData?.joined || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    onClose();
  };

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
        maxWidth: '500px',
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
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-page)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            color: 'var(--color-primary, #00D4FF)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            {initialData ? <Edit2 size={28} /> : <UserPlus size={28} />}
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-title)' }}>
            {initialData ? 'Edit Member' : 'Add New Member'}
          </h3>
          <p style={{ color: 'var(--text-main)', opacity: 0.6, fontSize: '0.9rem', marginTop: '4px' }}>
            {initialData ? 'Update roles and information of the member.' : 'Invite a new service provider or seeker to the platform.'}
          </p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', opacity: 0.8, marginBottom: '8px' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }}>
                <User size={18} />
              </div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 45px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-title)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', opacity: 0.8, marginBottom: '8px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 45px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-title)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', opacity: 0.8, marginBottom: '8px' }}>Access Role</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Seeking Service', 'Service Provider'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData({ ...formData, role })}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: formData.role === role ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
                    backgroundColor: formData.role === role ? 'rgba(139, 92, 246, 0.05)' : 'var(--bg-card)',
                    color: formData.role === role ? 'var(--color-primary)' : 'var(--text-main)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  {role === 'Service Provider' ? <Shield size={16} /> : <User size={16} />}
                  {role}
                  {formData.role === role && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >Cancel</button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: 'var(--color-primary, #00D4FF)',
                color: '#0A0E2A',
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
              {initialData ? 'Update Member' : 'Create Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AddUserModal;
