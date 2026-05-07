import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Wrench,
  Settings,
  LogOut,
  ChevronRight,
  Wind,
  Activity,
  Video,
  MessageSquare,
  X
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/airFixAi_logo.jpeg';
import WarningModal from '../Modals/WarningModal';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: CalendarCheck, label: 'Bookings', path: '/admin/bookings' },
  { icon: Activity, label: 'Diagnosis Manager', path: '/admin/diagnosis' },
  { icon: Video, label: 'Video Guides', path: '/admin/videos' },
  // { icon: MessageSquare, label: 'Chat', path: '/admin/chat' },
  { icon: Users, label: 'User Management', path: '/admin/users' },
  // { icon: Wrench, label: 'Services', path: '/admin/services' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, onClose }) => {
  const sidebarWidth = isCollapsed ? 'var(--sidebar-collapsed-width, 80px)' : 'var(--sidebar-width)';
  const navigate = useNavigate();
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  return (
    <>
      <WarningModal
        isOpen={showLogoutWarning}
        onClose={() => setShowLogoutWarning(false)}
        title="Confirm Sign Out"
        description="Are you sure you want to end your administrative session? You will need to re-authenticate to access the AirFix AI dashboard."
        buttons={[
          { text: 'Stay Logged In', variant: 'secondary', onClick: () => setShowLogoutWarning(false) },
          {
            text: 'Sign Me Out', variant: 'danger', onClick: () => {
              setShowLogoutWarning(false);
              navigate('/login');
            }
          }
        ]}
      />
      <aside
        className={`sidebar-container ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        style={{
          width: sidebarWidth,
          borderRadius: '0',
          background: 'var(--sidebar-bg)',
          backdropFilter: 'blur(20px)',
          zIndex: 1000,
          padding: isCollapsed ? '24px 12px' : '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          transition: 'var(--transition)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-101%)',
          borderRight: '1px solid var(--border-color)',
          overflowX: 'hidden'
        }}
      >
        <style>{`
          @media (min-width: 1025px) {
            .sidebar-container {
              transform: translateX(0) !important;
              border-radius: 0 !important;
            }
          }
          @media (max-width: 1024px) {
            .sidebar-container {
              border-radius: 0 var(--radius-xl) var(--radius-xl) 0 !important;
            }
          }
        `}</style>

        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-10 ${isCollapsed ? '' : 'px-4'}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div style={{
              padding: isCollapsed ? '4px' : '4px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              width: isCollapsed ? '48px' : '52px',
              height: isCollapsed ? '48px' : '52px'
            }}>
              <img
                src={logo}
                alt="AirFix AI"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </div>
            {!isCollapsed && (
              <div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
                  Air<span className="gradient-text">Fix</span> AI
                </h1>
                <p style={{ fontSize: '0.65rem', color: 'var(--sidebar-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', whiteSpace: 'nowrap' }}>
                  Admin Engine
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="mobile-only"
            style={{
              background: 'rgba(0,0,0,0.05)',
              border: 'none',
              padding: '8px',
              borderRadius: '10px',
              color: 'var(--text-title)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => {
                if (window.innerWidth <= 1024) onClose();
              }}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                width: isCollapsed ? '52px' : '100%',
                height: isCollapsed ? '52px' : 'auto',
                margin: isCollapsed ? '0 auto 12px' : '0 0 8px 0',
                gap: isCollapsed ? '0' : '14px',
                padding: isCollapsed ? '0' : '16px 20px',
                borderRadius: '16px',
                textDecoration: 'none',
                color: isActive ? 'white' : 'var(--text-main)',
                background: isActive ? 'var(--grad-primary)' : 'transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: isActive ? '0 10px 20px rgba(var(--color-primary-rgb, 0, 150, 255), 0.3)' : 'none',
                border: isActive ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent'
              })}
              className={({ isActive }) => !isActive ? 'hover-glass' : ''}
            >
              <item.icon size={20} style={{ minWidth: '20px' }} />
              {!isCollapsed && <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{item.label}</span>}
              {!isCollapsed && <ChevronRight size={16} opacity={0.5} />}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--sidebar-border)', paddingTop: '24px' }}>
          <button
            onClick={() => setShowLogoutWarning(true)}
            className="secondary-btn"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: isCollapsed ? '0' : '12px',
              justifyContent: 'center',
              padding: '14px',
              borderRadius: '14px',
              background: 'var(--bg-card)',
              color: 'var(--text-title)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            <LogOut size={18} style={{ minWidth: '18px' }} />
            {!isCollapsed && <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

