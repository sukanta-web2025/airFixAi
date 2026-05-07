import React, { useState } from 'react';
import { Search, Plus, Filter, Edit3, Trash2, ShieldCheck, Zap, Thermometer, Wind, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WarningModal from '../../components/Modals/WarningModal';

const servicesData = [
  { id: 'S-101', name: 'Deep Cleaning', category: 'Cleaning', price: 120, duration: '90 min', status: 'Active', icon: <Wind size={24} />, iconName: 'Wind' },
  { id: 'S-102', name: 'Gas Refill (Full)', category: 'Maintenance', price: 180, duration: '60 min', status: 'Active', icon: <Zap size={24} />, iconName: 'Zap' },
  { id: 'S-103', name: 'Leakage Diagnostic', category: 'Repair', price: 85, duration: '45 min', status: 'Active', icon: <Thermometer size={24} />, iconName: 'Thermometer' },
  { id: 'S-104', name: 'New Unit Install', category: 'Installation', price: 350, duration: '180 min', status: 'Active', icon: <Plus size={24} />, iconName: 'Plus' },
  { id: 'S-105', name: 'Circuit Repair', category: 'Repair', price: 150, duration: '120 min', status: 'Inactive', icon: <ShieldCheck size={24} />, iconName: 'Shield' },
  { id: 'S-106', name: 'Chemical Wash', category: 'Cleaning', price: 140, duration: '75 min', status: 'Active', icon: <Wind size={24} />, iconName: 'Wind' },
];

const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAddWarning, setShowAddWarning] = useState(false);
  const [showEditWarning, setShowEditWarning] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const navigate = useNavigate();

  return (
    <>
      <WarningModal 
        isOpen={showAddWarning}
        onClose={() => setShowAddWarning(false)}
        title="Create New Service Tier?"
        description="This will allow you to define a new AC maintenance package. Are you ready to configure the pricing and technical specs for this service?"
        buttons={[
          { text: 'Not Yet', variant: 'secondary', onClick: () => setShowAddWarning(false) },
          { text: 'Yes, Define Service', variant: 'primary', onClick: () => {
            setShowAddWarning(false);
            navigate('/admin/services/new');
          }}
        ]}
      />

      <WarningModal 
        isOpen={showEditWarning}
        onClose={() => setShowEditWarning(false)}
        title="Enter Edit Mode?"
        description={`You are about to modify the specifications for "${selectedService?.name}". Changes will affect global pricing and service provider durations.`}
        buttons={[
          { text: 'Cancel', variant: 'secondary', onClick: () => setShowEditWarning(false) },
          { text: 'Proceed to Edit', variant: 'primary', onClick: () => {
            setShowEditWarning(false);
            // Remove non-serializable icon element before navigating
            const { icon, ...serviceData } = selectedService;
            navigate('/admin/services/new', { state: { service: serviceData } });
          }}
        ]}
      />

      <WarningModal 
        isOpen={showDeleteWarning}
        onClose={() => setShowDeleteWarning(false)}
        title="Permanently Delete Service?"
        description={`Warning: Deleting "${selectedService?.name}" will remove it from the catalog and any future bookings. This action cannot be undone.`}
        icon={<AlertTriangle size={40} color="var(--color-danger)" />}
        buttons={[
          { text: 'Keep Service', variant: 'secondary', onClick: () => setShowDeleteWarning(false) },
          { text: 'Delete Permanently', variant: 'danger', onClick: () => setShowDeleteWarning(false) }
        ]}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
            Service <span className="gradient-text">Catalog</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600, marginTop: '4px' }}>Define and manage your AC servicing tiers and premium packages.</p>
        </div>
        <button 
          className="primary-btn" 
          style={{ padding: '14px 24px' }}
          onClick={() => setShowAddWarning(true)}
        >
          <Plus size={20} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Top Filter Bar */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search catalog by service name or ID..." 
            style={{ paddingLeft: '48px' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {['All', 'Cleaning', 'Maintenance', 'Repair', 'Installation'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                background: activeCategory === cat ? 'var(--grad-primary)' : 'var(--bg-card)',
                color: activeCategory === cat ? 'white' : 'var(--text-main)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Service Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {servicesData.filter(s => activeCategory === 'All' || s.category === activeCategory).map(service => (
          <div 
            key={service.id} 
            className="glass-panel" 
            style={{ 
              padding: '28px', 
              position: 'relative', 
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              transition: 'transform 0.3s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ 
                width: '52px', 
                height: '52px', 
                borderRadius: '16px', 
                background: 'var(--grad-primary)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(0, 150, 255, 0.2)'
              }}>
                {service.icon}
              </div>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                color: service.status === 'Active' ? 'var(--color-success)' : 'var(--color-danger)',
                background: service.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                padding: '4px 10px',
                borderRadius: '8px'
              }}>
                {service.status}
              </span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '4px', letterSpacing: '-0.5px' }}>{service.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '24px' }}>{service.category} Service • {service.duration}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>Base Rate</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-title)' }}>${service.price}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="hover-glass" 
                  onClick={() => { setSelectedService(service); setShowEditWarning(true); }}
                  style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-title)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  className="hover-glass" 
                  onClick={() => { setSelectedService(service); setShowDeleteWarning(true); }}
                  style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServicesPage;
