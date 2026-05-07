import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  CheckCheck,
  Circle,
  User,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import WarningModal from '../../components/Modals/WarningModal';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  const contacts = [
    { id: 1, name: 'John Doe', lastMsg: 'I need help with my AC.', time: '10:30 AM', online: true, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Sarah Wilson', lastMsg: 'Thank you for the quick fix!', time: 'Yesterday', online: false, avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Mike Johnson', lastMsg: 'When is the technician coming?', time: 'Yesterday', online: true, avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Emma Davis', lastMsg: 'The unit is making noise again.', time: '2 days ago', online: false, avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'David Miller', lastMsg: 'Can I reschedule my appointment?', time: '3 days ago', online: true, avatar: 'https://i.pravatar.cc/150?u=5' },
  ];

  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I noticed my AC is leaking water from the indoor unit.', sender: 'user', time: '10:00 AM' },
    { id: 2, text: 'Hi John! I can help with that. Have you checked if the drain pipe is clogged?', sender: 'admin', time: '10:02 AM' },
    { id: 3, text: 'I tried to look at it but I am not sure what to do.', sender: 'user', time: '10:05 AM' },
    { id: 4, text: 'No problem. I will guide you or we can schedule a technician visit.', sender: 'admin', time: '10:06 AM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([...messages, { id: Date.now(), text: message, sender: 'admin', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMessage('');
  };

  return (
    <div style={{ height: 'calc(100vh - 140px)', display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px' }}>
      {/* Contact List */}
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '20px' }}>
            Messages <span className="gradient-text">Hub</span>
          </h2>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="form-input"
              style={{ paddingLeft: '48px', background: 'var(--bg-page)' }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {contacts.map(contact => (
            <div
              key={contact.id}
              onClick={() => setSelectedUser(contact)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: selectedUser?.id === contact.id ? 'var(--color-primary)1A' : 'transparent',
                marginBottom: '4px'
              }}
              className={selectedUser?.id !== contact.id ? 'hover-glass' : ''}
            >
              <div style={{ position: 'relative' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', overflow: 'hidden', border: '2px solid var(--border-color)' }}>
                  <img src={contact.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-title)', fontSize: '0.95rem' }}>{contact.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>{contact.time}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>
                  {contact.lastMsg}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', overflow: 'hidden' }}>
                  <img src={selectedUser.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>{selectedUser.name}</h4>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
                <button
                  onClick={() => setShowHeaderMenu(!showHeaderMenu)}
                  className="hover-glass"
                  style={{ padding: '10px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-title)', cursor: 'pointer' }}
                >
                  <MoreVertical size={20} />
                </button>

                {showHeaderMenu && (
                  <>
                    <div
                      onClick={() => setShowHeaderMenu(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '8px',
                      width: '180px',
                      background: 'var(--bg-card)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '16px',
                      padding: '8px',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      animation: 'fadeIn 0.2s ease-out'
                    }}>
                      <button
                        className="hover-glass"
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', border: 'none', background: 'transparent', color: 'var(--text-title)', cursor: 'pointer', fontWeight: 700, textAlign: 'left', width: '100%' }}
                        onClick={() => {
                          setShowHeaderMenu(false);
                          if (selectedUser) navigate(`/admin/users/${selectedUser.id}`);
                        }}
                      >
                        <User size={18} />
                        View Profile
                      </button>
                      {/* <button 
                        className="hover-glass"
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer', fontWeight: 700, textAlign: 'left', width: '100%' }}
                        onClick={() => {
                          setShowHeaderMenu(false);
                          setShowBlockModal(true);
                        }}
                      >
                        <Circle size={18} style={{ opacity: 0.5 }} />
                        Block User
                      </button> */}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Warning Modal for Blocking */}
            <WarningModal
              isOpen={showBlockModal}
              onClose={() => setShowBlockModal(false)}
              title="Block User"
              description={`Are you sure you want to block ${selectedUser?.name}? They will no longer be able to message you, and all active service requests from this user will be flagged for review.`}
              buttons={[
                { text: 'Cancel', variant: 'secondary', onClick: () => setShowBlockModal(false) },
                {
                  text: 'Block User', variant: 'danger', onClick: () => {
                    // Logic to block user
                    console.log("Blocking user:", selectedUser?.id);
                    setShowBlockModal(false);
                  }
                }
              ]}
            />

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'admin' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    padding: '16px 20px',
                    borderRadius: msg.sender === 'admin' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                    background: msg.sender === 'admin' ? 'var(--grad-primary)' : 'var(--bg-page)',
                    color: msg.sender === 'admin' ? 'white' : 'var(--text-title)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    lineHeight: 1.5,
                    boxShadow: msg.sender === 'admin' ? '0 10px 20px rgba(var(--color-primary-rgb, 0, 150, 255), 0.2)' : 'none',
                    border: msg.sender === 'admin' ? 'none' : '1px solid var(--border-color)'
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>{msg.time}</span>
                    {msg.sender === 'admin' && <CheckCheck size={14} color="var(--color-primary)" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" className="hover-glass" style={{ padding: '10px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-title)', cursor: 'pointer' }}>
                    <Paperclip size={20} />
                  </button>
                  <button type="button" className="hover-glass" style={{ padding: '10px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-title)', cursor: 'pointer' }}>
                    <ImageIcon size={20} />
                  </button>
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    className="form-input"
                    style={{ paddingRight: '48px', height: '52px', borderRadius: '16px' }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="button" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <Smile size={20} />
                  </button>
                </div>
                <button
                  type="submit"
                  className="primary-btn"
                  style={{ width: '52px', height: '52px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                >
                  <Send size={22} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '40px',
              background: 'var(--bg-page)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              border: '1px solid var(--border-color)'
            }}>
              <MoreVertical size={48} color="var(--color-primary)" style={{ opacity: 0.3 }} />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '12px' }}>Your Inbox</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', fontWeight: 600, textAlign: 'center', maxWidth: '320px' }}>
              Select a conversation from the left to start messaging with users and technicians.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
