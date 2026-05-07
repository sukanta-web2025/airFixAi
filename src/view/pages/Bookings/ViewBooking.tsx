import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit3,
  User,
  MapPin,
  Wrench,
  Calendar,
  Clock,
  ShieldCheck,
  DollarSign,
  Tag,
  Printer,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ViewBooking: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the details view
  const booking = {
    id: id || '#BK-9021',
    customer: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Luxury Ave, Suite 405, Manhattan, NY',
    service: 'Deep Cleaning',
    serviceCategory: 'Maintenance',
    provider: 'Alex Rivera',
    customerId: 'cust-502',
    providerId: 'prov-101',
    status: 'Active',
    priority: 'High',
    date: '2026-04-27',
    time: '10:30 AM',
    price: '$85.00',
    unitModel: 'Split Inverter 1.5T',
    description: 'The unit is making unusual vibrating sounds during startup. Customer requested a deep cleaning and general checkup of the compressor.',
    timeline: [
      { status: 'Request Created', date: 'Apr 25, 2026', time: '02:15 PM', completed: true },
      { status: 'Provider Assigned', date: 'Apr 26, 2026', time: '09:00 AM', completed: true },
      { status: 'In Progress', date: 'Apr 27, 2026', time: '10:30 AM', completed: true },
      { status: 'Completion Pending', date: '--', time: '--', completed: false },
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
                Booking <span className="gradient-text">Details</span>
              </h2>
              <span style={{
                background: 'rgba(0, 150, 255, 0.1)',
                color: 'var(--color-primary)',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 800
              }}>
                {booking.id}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="secondary-btn" style={{ padding: '12px 20px' }}>
            <Printer size={18} />
            <span>Print Invoice</span>
          </button>
          <button className="primary-btn" onClick={() => navigate(`/admin/bookings/edit/${encodeURIComponent(id || '')}`, { state: { booking } })}>
            <Edit3 size={18} />
            <span>Edit Record</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Main Info Card */}
          <div className="glass-panel" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--grad-primary)', opacity: 0.05, filter: 'blur(50px)', borderRadius: '50%' }}></div>

            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', cursor: 'pointer' }}
              onClick={() => navigate(`/admin/users/${booking.customerId}`)}
              className="hover-opacity"
            >
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '24px',
                  background: 'var(--grad-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 900,
                  boxShadow: '0 15px 30px rgba(0, 150, 255, 0.3)'
                }}>
                  {booking.customer[0]}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-title)', margin: '0 0 4px 0' }}>{booking.customer}</h3>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} /> Verified Client</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> Member since 2024</span>
                  </div>
                </div>
              </div>
              <span className={`badge badge-${booking.status.toLowerCase()}`} style={{ padding: '8px 20px', fontSize: '0.9rem', borderRadius: '12px' }}>
                {booking.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Contact Information</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--color-primary)' }}><User size={18} /></div>
                    <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>{booking.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--color-primary)' }}><MapPin size={18} /></div>
                    <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>{booking.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ color: 'var(--color-primary)', marginTop: '2px' }}><MapPin size={18} /></div>
                    <span style={{ color: 'var(--text-title)', fontWeight: 600, lineHeight: '1.5' }}>{booking.address}</span>
                  </div>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Service Provider</label>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '16px', background: 'var(--bg-page)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                  onClick={() => navigate(`/admin/users/${booking.providerId}`)}
                  className="hover-opacity"
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--grad-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{booking.provider[0]}</div>
                  <div>
                    <div style={{ color: 'var(--text-title)', fontWeight: 800 }}>{booking.provider}</div>
                    <div style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700 }}>Senior Provider</div>
                  </div>
                  {/* <div style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>
                    <MoreHorizontal size={20} />
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Service Specifications */}
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Wrench size={24} color="var(--color-primary)" /> Service Specifications
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
              {[
                { label: 'Service Type', value: booking.service, icon: Tag, color: 'var(--color-primary)' },
                { label: 'Unit Model', value: booking.unitModel, icon: Wrench, color: 'var(--color-success)' },
                { label: 'Priority', value: booking.priority, icon: AlertCircle, color: 'var(--color-danger)' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px', borderRadius: '20px', background: 'var(--bg-page)', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: item.color, marginBottom: '12px' }}><item.icon size={20} /></div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ color: 'var(--text-title)', fontWeight: 800, fontSize: '1.05rem' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(0, 150, 255, 0.03)', border: '1px dashed var(--color-primary)' }}>
              <label style={{ display: 'block', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 800, marginBottom: '12px' }}>Issue Description</label>
              <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>{booking.description}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Payment Summary */}
          <div className="glass-panel" style={{ padding: '32px', background: 'var(--grad-primary)', color: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <DollarSign size={20} /> Payment Summary
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8, fontWeight: 600 }}>
                <span>Base Service</span>
                <span>$75.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8, fontWeight: 600 }}>
                <span>Equipment Fee</span>
                <span>$10.00</span>
              </div>
              <div style={{ margin: '12px 0', borderTop: '1px solid rgba(255,255,255,0.2)' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900 }}>
                <span>Total</span>
                <span>{booking.price}</span>
              </div>
            </div>
            <button style={{
              width: '100%',
              marginTop: '32px',
              padding: '16px',
              borderRadius: '16px',
              border: 'none',
              background: 'white',
              color: 'var(--color-primary)',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
              View Transactions
            </button>
          </div>

          {/* Timeline */}
          <div className="glass-panel" style={{ padding: '32px 32px 40px 32px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={20} color="var(--color-primary)" /> Service Timeline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', overflow: 'visible' }}>
              {booking.timeline.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: item.completed ? 'var(--color-success)' : 'var(--bg-page)',
                      border: item.completed ? 'none' : '2px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}>
                      {item.completed && <CheckCircle2 size={14} color="white" />}
                    </div>
                    {i !== booking.timeline.length - 1 && (
                      <div style={{
                        width: '2px',
                        flex: 1,
                        background: item.completed ? 'var(--color-success)' : 'var(--border-color)',
                        margin: '4px 0'
                      }}></div>
                    )}
                  </div>
                  <div style={{ paddingBottom: i === booking.timeline.length - 1 ? '10px' : '24px' }}>
                    <div style={{ color: item.completed ? 'var(--text-title)' : 'var(--text-muted)', fontWeight: 700, fontSize: '0.95rem' }}>{item.status}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginTop: '2px' }}>{item.date} • {item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default BookingDetails;
