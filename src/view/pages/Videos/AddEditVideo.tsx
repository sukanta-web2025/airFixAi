import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Video,
  Link,
  Type,
  FileText,
  Info
} from 'lucide-react';

const AddEditVideo: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.video;

  const [formData, setFormData] = useState({
    title: '',
    link: '',
    description: '',
    status: 'Active'
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || '',
        link: editData.link || '',
        description: editData.description || '',
        status: editData.status || 'Active'
      });
    }
  }, [editData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic
    navigate('/admin/videos');
  };

  return (
    <div style={{ paddingBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
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
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
              {id ? 'Edit' : 'Add'} <span className="gradient-text">Video Guide</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
              Configure video metadata and external links.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="form-group">
                <label className="form-label">Video Title</label>
                <div style={{ position: 'relative' }}>
                  <Type style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Troubleshooting Weak Airflow" 
                    style={{ paddingLeft: '48px' }}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Video Link (YouTube/URL)</label>
                <div style={{ position: 'relative' }}>
                  <Link style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                  <input 
                    type="url" 
                    className="form-input" 
                    placeholder="https://youtube.com/watch?v=..." 
                    style={{ paddingLeft: '48px' }}
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <div style={{ position: 'relative' }}>
                  <FileText style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} size={18} />
                  <textarea 
                    className="form-input" 
                    placeholder="Briefly explain what this video covers..." 
                    style={{ paddingLeft: '48px', minHeight: '120px', paddingTop: '14px' }}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="form-group">
                <label className="form-label">Publish Status</label>
                <select 
                  className="form-input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div style={{ padding: '24px', background: 'rgba(0, 150, 255, 0.05)', borderRadius: '20px', border: '1px solid rgba(0, 150, 255, 0.1)' }}>
                <div style={{ display: 'flex', gap: '12px', color: 'var(--color-primary)', marginBottom: '12px' }}>
                  <Info size={20} />
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Visual Note</div>
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 600 }}>
                  Thumbnails are automatically fetched from YouTube links. If using a custom URL, ensure it is publicly accessible.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="secondary-btn" 
              style={{ flex: 1, padding: '16px', fontSize: '1rem', fontWeight: 700 }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="primary-btn" 
              style={{ flex: 1, padding: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <Save size={20} />
              {id ? 'Update Video' : 'Save Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditVideo;
