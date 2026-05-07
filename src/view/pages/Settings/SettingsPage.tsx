import React, { useState } from 'react';
import { 
  Shield, 
  Globe, 
  Palette, 
  Save, 
  Smartphone,
  ChevronRight,
  Check
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme, accentColor, setAccentColor } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe size={20} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={20} /> },
  ];

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
            Platform <span className="gradient-text">Settings</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 600, marginTop: '4px' }}>Configure your AirFix AI administration environment.</p>
        </div>
        <button 
          className="primary-btn" 
          style={{ padding: '14px 32px' }}
          onClick={handleSave}
        >
          {saveSuccess ? <Check size={20} /> : <Save size={20} />}
          <span>{saveSuccess ? 'Changes Saved' : 'Save Configurations'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }}>
        {/* Sidebar Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid ' + (activeTab === tab.id ? 'var(--color-primary)' : 'var(--border-color)'),
                background: activeTab === tab.id ? 'var(--color-primary)1A' : 'var(--bg-card)',
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-main)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textAlign: 'left'
              }}
            >
              <span style={{ 
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-muted)',
                transition: 'all 0.3s'
              }}>
                {tab.icon}
              </span>
              <span style={{ flex: 1 }}>{tab.label}</span>
              {activeTab === tab.id && <ChevronRight size={16} />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="glass-panel" style={{ padding: '40px' }}>
          {activeTab === 'general' && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Globe size={24} className="gradient-text" />
                General Configuration
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label className="form-label">Platform Name</label>
                    <input type="text" className="form-input" defaultValue="AirFix AI Admin" />
                  </div>
                  <div>
                    <label className="form-label">Support Email</label>
                    <input type="email" className="form-input" defaultValue="support@airfix.ai" />
                  </div>
                </div>

                <div>
                  <label className="form-label">Timezone</label>
                  <select className="form-input">
                    <option>(GMT+08:00) Singapore, Kuala Lumpur</option>
                    <option>(GMT+00:00) London, Casablanca</option>
                    <option>(GMT-05:00) New York, Toronto</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">System Currency</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {['USD ($)', 'EUR (€)', 'GBP (£)', 'MYR (RM)'].map(curr => (
                      <button 
                        key={curr}
                        style={{
                          padding: '12px 20px',
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          background: curr.includes('USD') ? 'var(--color-primary)' : 'var(--bg-page)',
                          color: curr.includes('USD') ? 'white' : 'var(--text-title)',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          cursor: 'pointer'
                        }}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Palette size={24} className="gradient-text" />
                Interface Customization
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <div>
                  <label className="form-label" style={{ marginBottom: '16px' }}>Theme Mode</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div 
                      onClick={() => theme === 'dark' && toggleTheme()}
                      style={{
                        padding: '24px',
                        borderRadius: '20px',
                        border: `2px solid ${theme === 'light' ? 'var(--color-primary)' : 'var(--border-color)'}`,
                        background: '#F8FAFC',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s'
                      }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E293B', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <Palette size={20} />
                      </div>
                      <span style={{ fontWeight: 800, color: '#1E293B' }}>Light Minimal</span>
                    </div>

                    <div 
                      onClick={() => theme === 'light' && toggleTheme()}
                      style={{
                        padding: '24px',
                        borderRadius: '20px',
                        border: `2px solid ${theme === 'dark' ? 'var(--color-primary)' : 'var(--border-color)'}`,
                        background: '#020617',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s'
                      }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1E293B', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Palette size={20} />
                      </div>
                      <span style={{ fontWeight: 800, color: 'white' }}>Dark Obsidian</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="form-label">Accent Color</label>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '12px',
                    maxWidth: '100%'
                  }}>
                    {[
                      '#FB9707', // Brand Orange (Logo)
                      '#2CACF5', // Brand Blue (Logo)
                      '#0096FF', // AirFix Sky
                      '#6366F1', // Indigo
                      '#8B5CF6', // Violet
                      '#EC4899', // Pink
                      '#F43F5E', // Rose
                      '#EF4444', // Red
                      '#F97316', // Deep Orange
                      '#10B981', // Emerald
                      '#14B8A6', // Teal
                      '#06B6D4', // Cyan
                    ].map(color => (
                      <div 
                        key={color}
                        onClick={() => setAccentColor(color)}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '14px',
                          background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: accentColor === color ? '3px solid var(--text-title)' : 'none',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: accentColor === color ? `0 8px 20px ${color}66` : '0 4px 10px rgba(0,0,0,0.05)',
                          transform: accentColor === color ? 'scale(1.1)' : 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                          if (accentColor !== color) e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          if (accentColor !== color) e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {accentColor === color && <Check size={20} color="white" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'general' && activeTab !== 'appearance' && (
            <div style={{ padding: '60px 20px', textAlign: 'center', animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '24px', 
                background: 'rgba(0, 150, 255, 0.1)', 
                color: 'var(--color-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <Smartphone size={40} />
              </div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '8px' }}>Module Under Development</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '300px', margin: '0 auto' }}>
                We're currently fine-tuning this section to provide the best administrative experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
