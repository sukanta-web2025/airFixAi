import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, MoreVertical, Eye, Trash2, CheckCircle, TicketPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingFilterModal from '../../components/Modals/BookingFilterModal';
import WarningModal from '../../components/Modals/WarningModal';

const bookingsData = [
  { id: '#BK-9021', customer: 'John Doe', service: 'Deep Cleaning', tech: 'Alex Rivera', status: 'Active', date: '2026-04-27 10:30 AM', price: '$85.00' },
  { id: '#BK-9022', customer: 'Sarah Smith', service: 'Gas Refill', tech: 'Pending', status: 'Pending', date: '2026-04-27 02:15 PM', price: '$120.00' },
  { id: '#BK-9023', customer: 'Mike Johnson', service: 'Installation', tech: 'Maria Garcia', status: 'Completed', date: '2026-04-26 11:00 AM', price: '$250.00' },
  { id: '#BK-9024', customer: 'Emily Brown', service: 'General Repair', tech: 'Alex Rivera', status: 'Active', date: '2026-04-26 04:30 PM', price: '$65.00' },
  { id: '#BK-9025', customer: 'Robert Wilson', service: 'Leakage Fix', tech: 'Sam Wilson', status: 'Active', date: '2026-04-26 09:00 AM', price: '$110.00' },
  { id: '#BK-9026', customer: 'Linda Lee', service: 'Deep Cleaning', tech: 'Elena Kostic', status: 'Cancelled', date: '2026-04-25 01:20 PM', price: '$85.00' },
];

export const BookingsView: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showAddWarning, setShowAddWarning] = useState(false);
  const [showCompleteWarning, setShowCompleteWarning] = useState(false);
  const [showCancelWarning, setShowCancelWarning] = useState(false);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const navigate = useNavigate();

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.action-tooltip') && !target.closest('.action-toggle-btn')) {
        setActiveActionId(null);
      }
    };

    if (activeActionId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeActionId]);

  return (
    <>
      <BookingFilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={(f) => console.log('Filters:', f)}
      />

      <WarningModal
        isOpen={showAddWarning}
        onClose={() => setShowAddWarning(false)}
        title="Initialize New Request?"
        description="This will open the service request creation portal. Are you ready to enter the client and diagnosis details for a new AC maintenance ticket?"
        icon={<TicketPlus size={40} />}
        buttons={[
          { text: 'Not Now', variant: 'secondary', onClick: () => setShowAddWarning(false) },
          {
            text: 'Yes, Create Ticket', variant: 'primary', onClick: () => {
              setShowAddWarning(false);
              navigate('/admin/bookings/new');
            }
          }
        ]}
      />

      <style>{`
        @media (max-width: 640px) {
          .view-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .new-booking-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        
        .action-tooltip {
          position: absolute;
          right: 50px;
          top: 0;
          background: var(--bg-card);
          backdrop-filter: blur(30px) saturate(160%);
          -webkit-backdrop-filter: blur(30px) saturate(160%);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 8px;
          z-index: 200;
          display: flex;
          flex-direction: column;
          gap: 2px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          animation: tooltipPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          min-width: 180px;
          transform-origin: right top;
        }

        @keyframes tooltipPop {
          from { opacity: 0; transform: scale(0.9) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .action-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-align: left;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--text-main);
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
        }

        .action-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-primary);
          transform: translateX(-4px);
          border-color: rgba(0, 150, 255, 0.1);
          box-shadow: 0 4px 15px rgba(0, 150, 255, 0.1);
        }

        .action-item svg {
          transition: transform 0.3s;
        }

        .action-item:hover svg {
          transform: scale(1.1);
          color: var(--color-primary);
        }

        .action-danger:hover {
          color: var(--color-danger) !important;
          border-color: rgba(239, 68, 68, 0.1);
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.1);
        }

        .action-danger:hover svg {
          color: var(--color-danger) !important;
        }
      `}</style>

      <div className="view-header flex justify-between items-center mb-6">
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
            Service <span className="gradient-text">Log</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600, marginTop: '4px' }}>Monitor and manage all system service requests.</p>
        </div>
        {/* <button 
          className="primary-btn new-booking-btn"
          onClick={() => setShowAddWarning(true)}
        >
          <Plus size={20} />
          <span>New Request</span>
        </button> */}
      </div>

      <div className="glass-panel" style={{ padding: '28px', border: '1px solid var(--border-color)' }}>
        {/* Filters Bar */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by ID, name or service provider..."
              className="form-input"
              style={{ paddingLeft: '48px' }}
            />
          </div>
          <button
            className="secondary-btn"
            onClick={() => setShowFilters(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px' }}
          >
            <Filter size={18} />
            <span style={{ fontWeight: 700 }}>Filter View</span>
          </button>
          <button className="secondary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px' }}>
            <FileText size={18} />
            <span style={{ fontWeight: 700 }}>Export Data</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Service Type</th>
                <th>Assigned Provider</th>
                <th>Price</th>
                <th>Status</th>
                <th>Timeline</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((booking) => (
                <tr key={booking.id}>
                  <td style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{booking.id}</td>
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--text-title)' }}>{booking.customer}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{booking.service}</td>
                  <td>
                    {booking.tech === 'Pending' ? (
                      <span style={{
                        color: 'var(--color-danger)',
                        fontWeight: 800,
                        background: 'rgba(239, 68, 68, 0.1)',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>Unassigned</span>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--grad-primary)', fontSize: '0.75rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>{booking.tech[0]}</div>
                        <span style={{ fontWeight: 700 }}>{booking.tech}</span>
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 900, color: 'var(--text-title)' }}>{booking.price}</td>
                  <td>
                    <span className={`badge badge-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>{booking.date}</td>
                  <td style={{ textAlign: 'right', position: 'relative' }}>
                    <button
                      className="action-toggle-btn hover-glass"
                      onClick={() => setActiveActionId(activeActionId === booking.id ? null : booking.id)}
                      style={{
                        background: activeActionId === booking.id ? 'var(--bg-card)' : 'transparent',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        color: 'var(--text-title)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s'
                      }}
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* Action Tooltip */}
                    {activeActionId === booking.id && (
                      <div className="action-tooltip">
                        <div className="action-item" onClick={() => navigate(`/admin/bookings/${encodeURIComponent(booking.id)}`)}>
                          <Eye size={16} /> View Details
                        </div>
                        {/* <div className="action-item" onClick={() => navigate(`/admin/bookings/edit/${encodeURIComponent(booking.id)}`, { state: { booking } })}>
                          <Edit3 size={16} /> Edit Record
                        </div> */}
                        <div className="action-item" onClick={() => {
                          setSelectedBooking(booking);
                          setShowCompleteWarning(true);
                          setActiveActionId(null);
                        }}>
                          <CheckCircle size={16} color="var(--color-success)" /> Mark Complete
                        </div>
                        <div style={{ margin: '4px 0', borderTop: '1px solid var(--border-color)' }}></div>
                        <div className="action-item action-danger" style={{ color: 'var(--color-danger)' }} onClick={() => {
                          setSelectedBooking(booking);
                          setShowCancelWarning(true);
                          setActiveActionId(null);
                        }}>
                          <Trash2 size={16} /> Cancel Service
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 700 }}>Showing 6 of 128 active logs</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="secondary-btn" disabled style={{ padding: '10px 18px', opacity: 0.5 }}>Prev</button>
            <button className="primary-btn" style={{ padding: '10px 18px', width: 'auto' }}>1</button>
            <button className="secondary-btn" style={{ padding: '10px 18px' }}>2</button>
            <button className="secondary-btn" style={{ padding: '10px 18px' }}>Next</button>
          </div>
        </div>
      </div>
      <WarningModal
        isOpen={showCompleteWarning}
        onClose={() => setShowCompleteWarning(false)}
        title="Finalize Service Job?"
        description={`You are about to mark booking ${selectedBooking?.id} as completed. This will trigger the final invoice and notify the customer.`}
        icon={<CheckCircle size={40} color="var(--color-success)" />}
        buttons={[
          { text: 'Keep Active', variant: 'secondary', onClick: () => setShowCompleteWarning(false) },
          { text: 'Yes, Complete', variant: 'primary', onClick: () => setShowCompleteWarning(false) }
        ]}
      />

      <WarningModal
        isOpen={showCancelWarning}
        onClose={() => setShowCancelWarning(false)}
        title="Cancel This Service?"
        description={`Warning: Cancelling ${selectedBooking?.id} will notify the customer and the assigned provider. This action may incur platform fees.`}
        icon={<Trash2 size={40} color="var(--color-danger)" />}
        buttons={[
          { text: 'Keep Ticket', variant: 'secondary', onClick: () => setShowCancelWarning(false) },
          { text: 'Confirm Cancellation', variant: 'danger', onClick: () => setShowCancelWarning(false) }
        ]}
      />
    </>
  );
};
