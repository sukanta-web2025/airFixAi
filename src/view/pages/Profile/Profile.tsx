import React, { useState, useRef } from 'react';
import {
  User, Mail, Shield, Camera, MapPin,
  Phone, Edit2, Settings, Lock, Globe,
  CheckCircle2, ChevronRight
} from 'lucide-react';
import WarningModal from '../../components/Modals/WarningModal';
import ChangePasswordModal from '../../components/Modals/ChangePasswordModal';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showGeneralWarning, setShowGeneralWarning] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container" style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      {/* Reusable Modals */}
      <WarningModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        title="Security Check"
        description="Are you sure you want to change your administrative password? This will invalidate all your current sessions across devices."
        buttons={[
          { text: 'Cancel', variant: 'secondary', onClick: () => setShowWarningModal(false) },
          {
            text: 'Yes, Proceed', variant: 'danger', onClick: () => {
              setShowWarningModal(false);
              setShowPasswordModal(true);
            }
          }
        ]}
      />

      <WarningModal
        isOpen={showGeneralWarning}
        onClose={() => setShowGeneralWarning(false)}
        title="Update Profile?"
        description="Are you sure you want to save these changes to your administrative profile? These updates will be reflected across the entire system immediately."
        buttons={[
          { text: 'Discard', variant: 'secondary', onClick: () => setShowGeneralWarning(false) },
          {
            text: 'Save Updates', variant: 'primary', onClick: () => {
              setShowGeneralWarning(false);
              alert('Profile updated successfully!');
            }
          }
        ]}
      />

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />

      {/* Profile Header Banner */}
      <div className="profile-header-banner" style={{
        height: '240px',
        position: 'relative',
        marginBottom: '80px'
      }}>
        {/* Actual Colored Background Layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(rgba(2, 6, 23, 0.6), rgba(2, 6, 23, 0.8)), url('/home/wadmin/.gemini/antigravity/brain/d7e0490c-5f62-46a9-8ab8-1b152b55bab2/profile_banner_bg_1777294744212.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '30px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          zIndex: 1
        }}>
          {/* Animated Background Shapes in Banner */}
          <div className="global-bg-shape global-shape-1" style={{ width: '400px', height: '400px', opacity: 0.3, top: '-100px' }}></div>
          <div className="global-bg-shape global-shape-2" style={{ width: '300px', height: '300px', opacity: 0.3, bottom: '-100px' }}></div>
        </div>

        {/* Floating Avatar */}
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '40px',
          zIndex: 3
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '35px',
            background: 'var(--grad-primary)',
            padding: '4px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '32px',
              background: 'var(--grad-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={60} color="white" />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button
              onClick={handleImageClick}
              style={{
                position: 'absolute',
                bottom: '-5px',
                right: '-5px',
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'var(--color-accent)',
                border: '3px solid var(--bg-page)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                zIndex: 4
              }}
            >
              <Camera size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Name and Basic Info Section Below Banner */}
      <div style={{ paddingLeft: '180px', marginBottom: '40px', marginTop: '-30px' }} className="desktop-only">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
          Alex <span className="gradient-text">Rivera</span>
        </h1>
        <p style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1rem', margin: '4px 0 0 0', opacity: 0.8 }}>
          Lead Technical Administrator • <span style={{ color: 'var(--color-primary)' }}>San Francisco, CA</span>
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '40px',
        alignItems: 'start',
        paddingBottom: '40px'
      }}>
        {/* Navigation Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { id: 'account', label: 'Account Details', icon: User },
            { id: 'security', label: 'Security & login', icon: Shield },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 24px',
                borderRadius: '20px',
                background: activeTab === tab.id ? 'var(--grad-primary)' : 'var(--bg-card)',
                color: activeTab === tab.id ? 'white' : 'var(--text-main)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textAlign: 'left',
                border: '1px solid var(--border-color)',
                boxShadow: activeTab === tab.id ? '0 10px 20px rgba(0, 150, 255, 0.3)' : 'none'
              }}
              className="glass-panel"
            >
              <tab.icon size={18} opacity={activeTab === tab.id ? 1 : 0.6} />
              {tab.label}
              {activeTab === tab.id && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="glass-panel" style={{ padding: '40px', minHeight: '500px' }}>
          {activeTab === 'account' && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-title)' }}>General Settings</h3>
                <button className="primary-btn" style={{ padding: '12px 24px' }} onClick={() => setShowGeneralWarning(true)}>
                  <Edit2 size={16} /> Save Changes
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div className="flex-column gap-2">
                  <label style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>Full Name</label>
                  <input type="text" defaultValue="Alex Rivera" className="form-input" />
                </div>
                <div className="flex-column gap-2">
                  <label style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>Role Title</label>
                  <input type="text" defaultValue="Lead System Administrator" className="form-input" />
                </div>
                <div className="flex-column gap-2">
                  <label style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>Email Address</label>
                  <input type="email" defaultValue="alex.rivera@airfix.ai" className="form-input" />
                </div>
                <div className="flex-column gap-2">
                  <label style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>Phone Line</label>
                  <input type="text" defaultValue="+1 (555) 012-3456" className="form-input" />
                </div>
                <div className="flex-column gap-2" style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>Physical Address</label>
                  <input type="text" defaultValue="San Francisco, California, US" className="form-input" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '32px' }}>Security & Credentials</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{
                  padding: '24px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,150,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                      <Lock size={24} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: 'var(--text-title)' }}>Password Change</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Last updated 3 months ago</p>
                    </div>
                  </div>
                  <button className="secondary-btn" onClick={() => setShowWarningModal(true)}>Update Password</button>
                </div>


              </div>
            </div>
          )}

          {/* ... Other tabs follow similar premium pattern ... */}

        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .profile-container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
