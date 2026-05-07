import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, FileText, MoreVertical, Edit3, Trash2, UserCheck, UserPlus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddUserModal from '../../components/Modals/AddUserModal';
import WarningModal from '../../components/Modals/WarningModal';

const initialUsers = [
  { id: 1, name: 'Alex Rivera', email: 'alex@airfix.ai', role: 'Service Provider', status: 'Active', joined: 'Apr 12, 2026' },
  { id: 2, name: 'Maria Garcia', email: 'maria@airfix.ai', role: 'Seeking Service', status: 'Active', joined: 'Apr 15, 2026' },
  { id: 3, name: 'Sam Wilson', email: 'sam@airfix.ai', role: 'Seeking Service', status: 'Inactive', joined: 'Mar 28, 2026' },
  { id: 4, name: 'Elena Kostic', email: 'elena@airfix.ai', role: 'Service Provider', status: 'Active', joined: 'Apr 20, 2026' },
  { id: 5, name: 'Robert Fox', email: 'robert@airfix.ai', role: 'Seeking Service', status: 'Active', joined: 'Apr 22, 2026' },
  { id: 6, name: 'Linda May', email: 'linda@airfix.ai', role: 'Seeking Service', status: 'Pending', joined: 'Apr 25, 2026' },
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [activeActionId, setActiveActionId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSaveUser = (userData: any) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === userData.id ? userData : u));
    } else {
      setUsers([{ ...userData, id: Date.now() }, ...users]);
    }
    setEditingUser(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingUserId(id);
    setIsDeleteWarningOpen(true);
    setActiveActionId(null);
  };

  const confirmDelete = () => {
    if (deletingUserId) {
      setUsers(users.filter(u => u.id !== deletingUserId));
      setDeletingUserId(null);
    }
    setIsDeleteWarningOpen(false);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AddUserModal
        isOpen={isAddModalOpen || !!editingUser}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
        initialData={editingUser}
      />

      <WarningModal
        isOpen={isDeleteWarningOpen}
        onClose={() => setIsDeleteWarningOpen(false)}
        title="Delete User Account"
        description="Are you sure you want to remove this user? This action will permanently delete their access and all associated data."
        buttons={[
          { text: 'Keep Account', variant: 'secondary', onClick: () => setIsDeleteWarningOpen(false) },
          { text: 'Confirm Delete', variant: 'danger', onClick: confirmDelete }
        ]}
      />

      <style>{`
        .action-tooltip {
          position: absolute;
          right: 50px;
          top: 0;
          background: var(--bg-card);
          backdrop-filter: blur(30px) saturate(160%);
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
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--text-main);
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
          border: 1px solid transparent;
        }

        .action-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-primary);
          transform: translateX(-4px);
        }

        .action-danger:hover {
          color: var(--color-danger) !important;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--grad-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1.1rem;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .role-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 0.85rem;
        }
      `}</style>

      <div className="view-header flex justify-between items-center mb-6">
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
            User <span className="gradient-text">Management</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600, marginTop: '4px' }}>
            Control access levels and manage platform participants.
          </p>
        </div>
        <button
          className="primary-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          <UserPlus size={20} />
          <span>Add New User</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search users by name, email or role..."
              className="form-input"
              style={{ paddingLeft: '48px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="secondary-btn">
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <button className="secondary-btn">
            <FileText size={18} />
            <span>Export</span>
          </button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      className="hover-opacity"
                    >
                      <div className="user-avatar">{user.name[0]}</div>
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--text-title)', fontSize: '1rem' }}>{user.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="role-badge" style={{ color: user.role === 'Service Provider' ? 'var(--color-primary)' : 'var(--color-success)' }}>
                      <UserCheck size={16} />
                      {user.role}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>
                    {user.joined}
                  </td>
                  <td style={{ textAlign: 'right', position: 'relative' }}>
                    <button
                      className="action-toggle-btn hover-glass"
                      onClick={() => setActiveActionId(activeActionId === user.id ? null : user.id)}
                      style={{
                        background: activeActionId === user.id ? 'var(--bg-card)' : 'transparent',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        color: 'var(--text-title)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <MoreVertical size={18} />
                    </button>

                    {activeActionId === user.id && (
                      <div className="action-tooltip">
                        <div className="action-item" onClick={() => navigate(`/admin/users/${user.id}`)}>
                          <Eye size={16} /> View Profile
                        </div>
                        <div className="action-item" onClick={() => {
                          setEditingUser(user);
                          setActiveActionId(null);
                        }}>
                          <Edit3 size={16} /> Edit Profile
                        </div>
                        <div style={{ margin: '4px 0', borderTop: '1px solid var(--border-color)' }}></div>
                        <div className="action-item action-danger" style={{ color: 'var(--color-danger)' }} onClick={() => handleDeleteClick(user.id)}>
                          <Trash2 size={16} /> Remove User
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 700 }}>
            Showing {filteredUsers.length} of {users.length} members
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="secondary-btn" disabled>Prev</button>
            <button className="primary-btn" style={{ width: 'auto', padding: '10px 18px' }}>1</button>
            <button className="secondary-btn">Next</button>
          </div>
        </div>
      </div>
    </>
  );
};
