import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit3, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Briefcase
} from 'lucide-react';

export const UserDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the user details
  const user = {
    id: id || '1',
    name: 'Alex Rivera',
    email: 'alex.rivera@airfix.ai',
    phone: '+1 (555) 234-5678',
    role: 'Service Provider',
    status: 'Active',
    joined: 'April 12, 2026',
    address: '4528 Industrial Way, Brooklyn, NY 11201',
    bio: 'Senior HVAC specialist with over 8 years of experience in residential and commercial cooling systems. Expert in diagnostic repair and unit installation.',
    rating: 4.9,
    reviews: 128,
    jobsCompleted: 342,
    availability: 'Available',
    skills: ['HVAC Repair', 'Deep Cleaning', 'Gas Refill', 'Unit Installation', 'Electrical Systems'],
    recentActivity: [
      { action: 'Completed Service #BK-9021', date: '2 hours ago' },
      { action: 'Assigned to Service #BK-9035', date: '5 hours ago' },
      { action: 'Updated profile information', date: '1 day ago' },
    ]
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate(-1)}
            className="hover-glass"
            style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', 
              padding: '12px', 
              borderRadius: '12px', 
              color: 'var(--text-title)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
              User <span className="gradient-text">Profile</span>
            </h2>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="primary-btn" style={{ padding: '12px 24px' }}>
            <Edit3 size={18} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        {/* Sidebar Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '32px', 
              background: 'var(--grad-primary)', 
              margin: '0 auto 24px',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '3rem',
              color: 'white',
              fontWeight: 900,
              boxShadow: '0 20px 40px rgba(0, 150, 255, 0.3)',
              border: '4px solid rgba(255, 255, 255, 0.1)'
            }}>
              {user.name[0]}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '8px' }}>{user.name}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              <span className={`badge badge-${user.status.toLowerCase()}`} style={{ padding: '6px 14px' }}>{user.status}</span>
              <span style={{ 
                background: 'rgba(139, 92, 246, 0.1)', 
                color: '#8B5CF6', 
                padding: '6px 14px', 
                borderRadius: '10px', 
                fontSize: '0.75rem', 
                fontWeight: 800,
                textTransform: 'uppercase'
              }}>{user.role}</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--color-primary)' }}><Mail size={18} /></div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Email</div>
                  <div style={{ color: 'var(--text-title)', fontWeight: 600 }}>{user.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--color-primary)' }}><Phone size={18} /></div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Phone</div>
                  <div style={{ color: 'var(--text-title)', fontWeight: 600 }}>{user.phone}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--color-primary)' }}><MapPin size={18} /></div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Location</div>
                  <div style={{ color: 'var(--text-title)', fontWeight: 600 }}>{user.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '20px' }}>About {user.name.split(' ')[0]}</h4>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{user.bio}</p>
            
            <div style={{ marginTop: '32px' }}>
              <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Expertise & Skills</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {user.skills.map(skill => (
                  <span key={skill} style={{ 
                    padding: '8px 16px', 
                    borderRadius: '12px', 
                    background: 'rgba(0, 150, 255, 0.05)', 
                    color: 'var(--color-primary)', 
                    fontSize: '0.85rem', 
                    fontWeight: 700,
                    border: '1px solid rgba(0, 150, 255, 0.1)'
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} color="var(--color-primary)" /> Recent Activity
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {user.recentActivity.map((activity, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', marginTop: '6px' }}></div>
                    <div>
                      <div style={{ color: 'var(--text-title)', fontWeight: 700, fontSize: '0.9rem' }}>{activity.action}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>{activity.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '32px', background: 'var(--grad-primary)', color: 'white' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={20} /> Work History
              </h4>
              <p style={{ opacity: 0.9, fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                View complete history of assigned service tickets and performance metrics.
              </p>
              <button style={{ 
                width: '100%', 
                padding: '14px', 
                borderRadius: '12px', 
                border: 'none', 
                background: 'white', 
                color: 'var(--color-primary)', 
                fontWeight: 800,
                cursor: 'pointer'
              }}>View All Jobs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default UserDetails;
