import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Play, 
  Video,
  ExternalLink,
  Eye
} from 'lucide-react';
import WarningModal from '../../components/Modals/WarningModal';

const VideoManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  // Mock data
  const [videos, setVideos] = useState([
    { id: 1, title: 'AC Not Cooling', link: 'https://youtube.com/watch?v=123', description: 'Check common causes for weak cooling and airflow.', status: 'Active', thumbnail: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=400' },
    { id: 2, title: 'Unusual AC Noises', link: 'https://youtube.com/watch?v=456', description: 'Identify rattling, buzzing, or grinding sounds.', status: 'Active', thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400' },
    { id: 3, title: 'Water Leakage Fix', link: 'https://youtube.com/watch?v=789', description: 'Simple steps to clear a clogged AC drain pipe.', status: 'Active', thumbnail: 'https://images.unsplash.com/photo-1599933310633-6f13f6f3918a?w=400' },
    { id: 4, title: 'AC Filter Maintenance', link: 'https://youtube.com/watch?v=abc', description: 'How to clean your filters for peak performance.', status: 'Active', thumbnail: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400' },
  ]);

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    setVideos(videos.filter(v => v.id !== selectedVideo.id));
    setShowDeleteModal(false);
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
            Video <span className="gradient-text">Library</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600, marginTop: '4px' }}>
            Manage related instructional and troubleshooting videos.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => navigate('/admin/videos/preview')}
            className="hover-glass"
            style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', 
              padding: '12px 24px', 
              borderRadius: '14px', 
              color: 'var(--text-title)', 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <Eye size={18} />
            Preview Gallery
          </button>
          <button 
            onClick={() => navigate('/admin/videos/add')}
            className="primary-btn"
            style={{ padding: '12px 24px' }}
          >
            <Plus size={20} />
            Add Video
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {[
          { label: 'Total Videos', value: videos.length, icon: Video, color: 'var(--color-primary)' },
          { label: 'Active Guides', value: videos.filter(v => v.status === 'Active').length, icon: Play, color: 'var(--color-success)' },
          { label: 'Recently Added', value: '2 Today', icon: Plus, color: 'var(--color-warning)' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
              <stat.icon size={28} />
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>{stat.label}</div>
              <div style={{ color: 'var(--text-title)', fontSize: '1.5rem', fontWeight: 900 }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & List */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
          <input 
            type="text" 
            placeholder="Search by video title..." 
            className="form-input"
            style={{ paddingLeft: '48px', maxWidth: '400px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredVideos.map(video => (
            <div key={video.id} className="hover-glass" style={{ 
              padding: '16px 20px', 
              borderRadius: '20px', 
              background: 'rgba(255, 255, 255, 0.02)', 
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ width: '100px', height: '60px', borderRadius: '12px', background: 'var(--bg-page)', position: 'relative', overflow: 'hidden' }}>
                <img src={video.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={16} color="white" fill="white" />
                </div>
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>{video.title}</h4>
                  <span style={{ 
                    padding: '2px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.65rem', 
                    fontWeight: 900, 
                    textTransform: 'uppercase',
                    background: video.status === 'Active' ? 'var(--color-success)20' : 'rgba(255,255,255,0.05)',
                    color: video.status === 'Active' ? 'var(--color-success)' : 'var(--text-muted)'
                  }}>
                    {video.status}
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{video.description}</p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => window.open(video.link, '_blank')}
                  className="hover-glass" 
                  style={{ padding: '10px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-title)', cursor: 'pointer' }}
                  title="View Link"
                >
                  <ExternalLink size={18} />
                </button>
                <button 
                  onClick={() => navigate(`/admin/videos/edit/${video.id}`, { state: { video } })}
                  className="hover-glass" 
                  style={{ padding: '10px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-title)', cursor: 'pointer' }}
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => {
                    setSelectedVideo(video);
                    setShowDeleteModal(true);
                  }}
                  className="hover-glass" 
                  style={{ padding: '10px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <WarningModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Video"
        description={`Are you sure you want to delete "${selectedVideo?.title}"? This action cannot be undone and will remove the guide from the user application.`}
        buttons={[
          { text: 'Keep Video', variant: 'secondary', onClick: () => setShowDeleteModal(false) },
          { text: 'Delete Video', variant: 'danger', onClick: handleDelete }
        ]}
      />
    </div>
  );
};

export default VideoManagement;
