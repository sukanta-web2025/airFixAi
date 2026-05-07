import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  ChevronLeft
} from 'lucide-react';

const VideoGallery: React.FC = () => {
  const navigate = useNavigate();

  const videos = [
    { id: 1, title: 'AC Not Cooling', desc: 'Check common causes for weak cooling and restricted airflow.', img: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600' },
    { id: 2, title: 'Unusual AC Noises', desc: 'Identify and troubleshoot rattling or buzzing sounds.', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600' },
    { id: 3, title: 'Water Leakage Fix', desc: 'Simple steps to clear a clogged or frozen drain pipe.', img: 'https://images.unsplash.com/photo-1599933310633-6f13f6f3918a?w=600' },
    { id: 4, title: 'Filter Maintenance', desc: 'Improve efficiency with regular air filter cleaning.', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600' },
    { id: 5, title: 'Remote Not Working', desc: 'Resetting and syncing your AC remote controller.', img: 'https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=600' },
    { id: 6, title: 'AC Not Turning On', desc: 'Troubleshoot power issues and electrical connections.', img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'transparent',
      padding: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <button 
          onClick={() => navigate('/admin/videos')}
          style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '16px', 
            background: 'white', 
            border: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={24} color="#1E293B" />
        </button>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1E293B', margin: 0 }}>Related Videos</h2>
        <div style={{ width: '48px' }}></div> {/* Spacer */}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px' 
      }}>
        {videos.map((video) => (
          <div key={video.id} style={{ 
            background: 'white', 
            borderRadius: '24px', 
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ position: 'relative', height: '120px' }}>
              <img src={video.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.8)', 
                  backdropFilter: 'blur(4px)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Play size={18} color="#1E293B" fill="#1E293B" />
                </div>
              </div>
            </div>
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1E293B', marginBottom: '4px', margin: 0 }}>{video.title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>{video.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
