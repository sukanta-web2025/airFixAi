import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  Wind,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const stats = [
  { label: 'Total Requests', value: '1,284', trend: '+12.5%', icon: CalendarCheck, color: 'var(--color-primary)' },
  { label: 'Active Technicians', value: '42', trend: '+3', icon: Users, color: 'var(--color-success)' },
  { label: 'Pending Repairs', value: '18', trend: '-5%', icon: AlertCircle, color: 'var(--color-danger)' },
  { label: 'Completed Jobs', value: '956', trend: '+18%', icon: CheckCircle2, color: 'var(--color-primary)' },
];

const recentBookings = [
  { id: '#BK-9021', customer: 'John Doe', service: 'Deep Cleaning', status: 'Active', date: '2026-04-27' },
  { id: '#BK-9022', customer: 'Sarah Smith', service: 'Gas Refill', status: 'Pending', date: '2026-04-27' },
  { id: '#BK-9023', customer: 'Mike Johnson', service: 'Installation', status: 'Completed', date: '2026-04-26' },
  { id: '#BK-9024', customer: 'Emily Brown', service: 'General Repair', status: 'Active', date: '2026-04-26' },
];

export const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-6" style={{ marginTop: '-12px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-title)', letterSpacing: '-0.5px', marginTop: 0 }}>
          System <span className="gradient-text">Intelligence</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome back, Alex. Here's a snapshot of today's operations.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel stat-card" style={{ border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ 
                background: `${stat.color}20`, 
                color: stat.color,
                padding: '14px',
                borderRadius: '16px'
              }}>
                <stat.icon size={26} />
              </div>
              <div style={{ 
                color: stat.trend.startsWith('+') ? 'var(--color-success)' : 'var(--color-danger)', 
                fontSize: '0.85rem', 
                fontWeight: 800, 
                display: 'flex', 
                alignItems: 'center',
                background: stat.trend.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                padding: '4px 10px',
                borderRadius: '20px'
              }}>
                {stat.trend} <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
              </div>
            </div>
            <div style={{ marginTop: '24px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>{stat.label}</p>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)', marginTop: '6px' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Main Content Grid */}
      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        <style>{`
          @media (min-width: 1280px) {
            .dashboard-grid {
              grid-template-columns: 2fr 1fr !important;
            }
          }
        `}</style>
        
        {/* Recent Bookings Table */}
        <div className="glass-panel" style={{ padding: '28px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <h3 style={{ fontWeight: 800, color: 'var(--text-title)', fontSize: '1.25rem' }}>Service Requests</h3>
            <button className="secondary-btn" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>View Report</button>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Customer</th>
                  <th>Service Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{booking.id}</td>
                    <td style={{ fontWeight: 600 }}>{booking.customer}</td>
                    <td>{booking.service}</td>
                    <td>
                      <span className={`badge badge-${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technician Status */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontWeight: 800, color: 'var(--text-title)', fontSize: '1.25rem', marginBottom: '28px' }}>Active Staff</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              { name: 'Alex Rivera', status: 'On Job', location: 'Brooklyn' },
              { name: 'Maria Garcia', status: 'Available', location: 'Queens' },
              { name: 'Sam Wilson', status: 'On Job', location: 'Manhattan' },
              { name: 'Elena Kostic', status: 'Available', location: 'Bronx' },
            ].map((tech, i) => (
              <div key={i} style={{ 
                padding: '14px', 
                borderRadius: '16px', 
                background: 'var(--input-bg)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                border: '1px solid var(--border-color)',
                transition: 'var(--transition)'
              }} className="tech-item">
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '12px', 
                  background: 'var(--grad-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}>{tech.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)' }}>{tech.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{tech.location}</p>
                </div>
                <div style={{ 
                  padding: '4px 10px',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: tech.status === 'Available' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                  color: tech.status === 'Available' ? 'var(--color-success)' : 'var(--color-primary)'
                }}>{tech.status}</div>
              </div>
            ))}
          </div>
          <button className="primary-btn" style={{ width: '100%', marginTop: '28px', justifyContent: 'center', padding: '16px' }}>
            Schedule New Job
          </button>
        </div>
      </div>
    </div>
  );
};
