import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save, Zap, Clock, DollarSign, Tag, Info } from 'lucide-react';

const AddServicePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.service;

  const [formData, setFormData] = useState({
    name: '',
    category: 'Cleaning',
    price: '',
    duration: '',
    icon: 'Wind',
    status: 'Active',
    description: ''
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        category: editData.category || 'Cleaning',
        price: editData.price?.toString() || '',
        duration: editData.duration || '',
        icon: editData.iconName || 'Wind',
        status: editData.status || 'Active',
        description: editData.description || ''
      });
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
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
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
            {editData ? 'Edit' : 'New'} <span className="gradient-text">Catalog Tier</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600, marginTop: '4px' }}>
            {editData ? `Updating configuration for ${editData.name}` : 'Expand your AirFix AI service offerings.'}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '24px' }}>Service Specifications</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Service Title</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="e.g. Premium Winter Maintenance" 
                />
              </div>
              
              <div>
                <label className="form-label">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option>Cleaning</option>
                  <option>Maintenance</option>
                  <option>Repair</option>
                  <option>Installation</option>
                </select>
              </div>

              <div>
                <label className="form-label">Base Price ($)</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={16} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }} />
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-input" 
                    style={{ paddingLeft: '40px' }} 
                    placeholder="0.00" 
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Expected Duration</label>
                <div style={{ position: 'relative' }}>
                  <Clock size={16} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="form-input" 
                    style={{ paddingLeft: '40px' }} 
                    placeholder="e.g. 60 min" 
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Icon Identifier</label>
                <select 
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option>Wind</option>
                  <option>Zap</option>
                  <option>Thermometer</option>
                  <option>Shield</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Detailed Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-input" 
                  style={{ minHeight: '140px', resize: 'vertical' }}
                  placeholder="Outline exactly what is included in this service tier..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '24px' }}>Configuration</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="form-label">Status</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className={formData.status === 'Active' ? "primary-btn" : "secondary-btn"} 
                    style={{ flex: 1, padding: '12px' }}
                    onClick={() => setFormData(prev => ({ ...prev, status: 'Active' }))}
                  >
                    Active
                  </button>
                  <button 
                    className={formData.status === 'Inactive' ? "primary-btn" : "secondary-btn"} 
                    style={{ flex: 1, padding: '12px' }}
                    onClick={() => setFormData(prev => ({ ...prev, status: 'Inactive' }))}
                  >
                    Inactive
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label className="form-label">Feature Highlights</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Free Quote', 'Same Day Service', 'Warranty Included'].map(tag => (
                    <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', borderRadius: '10px', background: 'var(--bg-page)', border: '1px solid var(--border-color)' }}>
                      <input type="checkbox" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="primary-btn" style={{ width: '100%', padding: '16px' }} onClick={() => navigate('/admin/services')}>
                  <Save size={18} />
                  {editData ? 'Update Service' : 'Publish Service'}
                </button>
                <button className="secondary-btn" style={{ width: '100%', padding: '16px' }} onClick={() => navigate(-1)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 150, 255, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Info size={20} />
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              {editData 
                ? 'Updates to existing services will be reflected immediately in all active client sessions.' 
                : 'Newly published services will appear instantly in the customer-facing mobile application.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServicePage;
