import React from 'react';
import { Check } from 'lucide-react';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="custom-checkbox-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
      <style>{`
        .custom-checkbox-wrapper .checkbox-box {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }

        .custom-checkbox-wrapper:hover .checkbox-box {
          border-color: var(--color-primary);
          background: rgba(139, 92, 246, 0.1);
          transform: scale(1.05);
        }

        .custom-checkbox-wrapper.is-checked .checkbox-box {
          background: var(--grad-primary);
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }

        .checkbox-tick {
          color: white;
          transform: scale(0) rotate(-45deg);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .custom-checkbox-wrapper.is-checked .checkbox-tick {
          transform: scale(1) rotate(0deg);
        }

        .checkbox-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          transition: color 0.3s;
        }

        .custom-checkbox-wrapper.is-checked .checkbox-label {
          color: white;
        }
      `}</style>
      
      <div className={`checkbox-box ${checked ? 'is-checked' : ''}`}>
        <div className={`checkbox-tick`}>
          <Check size={14} strokeWidth={4} />
        </div>
      </div>
      
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)}
        style={{ display: 'none' }}
      />
      
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
