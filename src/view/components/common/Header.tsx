import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { Sun, Moon, Bell, User, Menu, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onCollapseClick: () => void;
  isCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onCollapseClick, isCollapsed }) => {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = React.useState(false);

  // Sample notifications
  const notifications = [
    { id: 1, title: 'New Service Request', time: '5m ago', type: 'new', color: 'var(--color-primary)' },
    { id: 2, title: 'Service Overdue: AC-902', time: '20m ago', type: 'alert', color: 'var(--color-danger)' },
    { id: 3, title: 'Engineer Dispatched', time: '1h ago', type: 'info', color: 'var(--color-success)' },
    { id: 4, title: 'System Backup Complete', time: '3h ago', type: 'system', color: 'var(--color-accent)' },
  ];

  return (
    <header
      className="fixed top-0 right-0 glass-panel header-container"
      style={{
        zIndex: 1500,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeft: '1px solid var(--border-color)',
        transition: 'var(--transition)',
        paddingLeft: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            if (window.innerWidth <= 1024) {
              onMenuClick();
            } else {
              onCollapseClick();
            }
          }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-title)',
            transition: 'var(--transition)',
            marginLeft: '10px',
          }}
        >
          {/* Responsive Icon logic */}
          <div className="mobile-only">
            <Menu size={20} />
          </div>
          <div className="desktop-only">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </div>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-title)',
            transition: 'all 0.3s'
          }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div style={{ position: 'relative' }}>
          <Link
            to="/admin/notifications"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'pointer',
              color: 'var(--text-title)',
              transition: 'all 0.3s',
              textDecoration: 'none'
            }}
          >
            <Bell size={20} />
            <span style={{
              position: 'absolute',
              top: '11px',
              right: '11px',
              width: '8px',
              height: '8px',
              background: 'var(--color-accent)',
              borderRadius: '50%',
              border: '2px solid var(--bg-card)'
            }}></span>
          </Link>
        </div>

        <Link
          to="/admin/profile"
          className="flex items-center gap-3"
          style={{
            paddingLeft: '12px',
            marginLeft: '4px',
            borderLeft: '1px solid var(--border-color)',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onClick={() => setShowNotifications(false)}
        >
          <div className="desktop-only" style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-title)' }}>Alex Rivera</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lead Admin</p>
          </div>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 6px 12px rgba(0, 150, 255, 0.2)'
          }}>
            <User size={20} />
          </div>
        </Link>
      </div>
    </header>
  );
};

