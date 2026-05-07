import React, { useState } from 'react';
import { Bell, Shield, Mail, User, CreditCard, Search, Filter, Trash2, CheckCircle, Clock } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const allNotifications = [
    { id: 1, title: 'Critical: System Maintenance', desc: 'The AirFix AI core engine will undergo scheduled maintenance at 2:00 AM UTC. Expect brief downtime.', time: '10m ago', type: 'system', icon: Settings, color: 'var(--color-accent)' },
    { id: 2, title: 'New Technician Request', desc: 'Technician John Doe has requested access to the San Francisco dispatch zone.', time: '45m ago', type: 'tech', icon: User, color: 'var(--color-primary)' },
    { id: 3, title: 'Service Delayed: SR-10293', desc: 'The cooling system service for Client #902 has been delayed due to parts unavailability.', time: '2h ago', type: 'alert', icon: Shield, color: 'var(--color-danger)' },
    { id: 4, title: 'Package Renewal Successful', desc: 'Standard AC Maintenance package for user Alex Rivera has been renewed for 12 months.', time: '5h ago', type: 'billing', icon: CreditCard, color: 'var(--color-success)' },
    { id: 5, title: 'Security Alert: New Login', desc: 'A new login was detected from a Chrome browser on a Mac OS device.', time: '1d ago', type: 'security', icon: Lock, color: 'var(--color-warning)' },
    { id: 6, title: 'Weekly Performance Report', desc: 'Your weekly technician productivity report is now available for download.', time: '2d ago', type: 'report', icon: Mail, color: 'var(--color-primary)' }
  ];

  const filteredNotifications = filter === 'all' 
    ? allNotifications 
    : allNotifications.filter(n => n.type === filter || (filter === 'important' && ['alert', 'security'].includes(n.type)));

  return (
    <div className="notifications-page" style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
            Center <span className="gradient-text">Notifications</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '1rem', marginTop: '8px' }}>
            Manage your administrative alerts and system activities.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="secondary-btn">
            <CheckCircle size={18} /> Mark all read
          </button>
          <button className="secondary-btn" style={{ color: 'var(--color-danger)' }}>
            <Trash2 size={18} /> Clear All
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: 'All Activity' },
            { id: 'important', label: 'Important' },
            { id: 'system', label: 'System' },
            { id: 'billing', label: 'Billing' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: 'none',
                background: filter === f.id ? 'var(--grad-primary)' : 'rgba(255,255,255,0.05)',
                color: filter === f.id ? 'white' : 'var(--text-main)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search alerts..." 
            className="form-input" 
            style={{ paddingLeft: '45px', fontSize: '0.85rem' }} 
          />
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredNotifications.map((notif) => (
          <div key={notif.id} className="glass-panel" style={{ 
            padding: '24px', 
            display: 'grid', 
            gridTemplateColumns: 'auto 1fr auto', 
            gap: '24px', 
            alignItems: 'center',
            transition: 'var(--transition)',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: `${notif.color}15`,
              color: notif.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <notif.icon size={28} />
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)' }}>{notif.title}</h4>
                {['system', 'alert', 'security'].includes(notif.type) && (
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '8px', 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    color: 'var(--color-danger)', 
                    fontSize: '0.65rem', 
                    fontWeight: 900, 
                    textTransform: 'uppercase' 
                  }}>Priority</span>
                )}
              </div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '800px' }}>{notif.desc}</p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>
                <Clock size={14} /> {notif.time}
              </div>
              <button style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--color-primary)', 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                cursor: 'pointer',
                opacity: 0.8
              }}>Dismiss Action</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Internal icon mappings since we might not have all named identically
const Lock = Shield;
const Settings = Bell;

export default NotificationsPage;
