import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../view/components/common/Sidebar';
import { Header } from '../view/components/common/Header';

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`admin-container ${isSidebarOpen ? 'sidebar-open' : ''} ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Background Shapes for Glass Aesthetic */}
      <div className="global-bg-shape global-shape-1"></div>
      <div className="global-bg-shape global-shape-2"></div>

      {/* Mobile Overlay */}
      <div 
        className="sidebar-overlay" 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <Sidebar 
        isOpen={isSidebarOpen} 
        isCollapsed={isCollapsed}
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div style={{ flex: 1, position: 'relative', minWidth: 0, transition: 'var(--transition)' }}>
        <Header onMenuClick={toggleSidebar} onCollapseClick={toggleCollapse} isCollapsed={isCollapsed} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

