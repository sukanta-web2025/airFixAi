import React, { memo } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export type ModalButton = {
  text: string;
  variant: 'primary' | 'danger' | 'secondary';
  onClick: () => void;
};

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttons: ModalButton[];
  icon?: React.ReactNode;
}

const WarningModal: React.FC<WarningModalProps> = memo(({
  isOpen,
  onClose,
  title,
  description,
  buttons,
  icon
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div style={{
        width: '100%',
        maxWidth: '450px',
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

        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--color-danger)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            {icon || <AlertTriangle size={40} />}
          </div>
          
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '12px', letterSpacing: '-0.5px' }}>{title}</h3>
          <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '32px', opacity: 0.8 }}>{description}</p>
          
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            marginTop: '8px' 
          }}>
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={() => {
                  btn.onClick();
                  onClose();
                }}
                className={btn.variant === 'secondary' ? 'secondary-btn' : 'primary-btn'}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: btn.variant === 'danger' ? 'var(--color-danger)' : undefined,
                  boxShadow: btn.variant === 'danger' ? '0 10px 20px rgba(239, 68, 68, 0.2)' : undefined
                }}
              >
                {btn.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default WarningModal;
