import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';

const Login = lazy(() => import('../view/pages/Login/Login'));
const Dashboard = lazy(() => import('../view/pages/Dashboard/Dashboard').then(module => ({ default: module.Dashboard })));
const Bookings = lazy(() => import('../view/pages/Bookings/Bookings').then(module => ({ default: module.BookingsView })));
const AddBooking = lazy(() => import('../view/pages/Bookings/AddBooking'));

const Technicians = () => (
  <div>
    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '24px', letterSpacing: '-0.5px' }}>
      Technician <span className="gradient-text">Network</span>
    </h2>
    <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>Management module for service personnel is coming soon.</p>
    </div>
  </div>
);

const Profile = lazy(() => import('../view/pages/Profile/Profile').then(module => ({ default: module.default })));
const Settings = lazy(() => import('../view/pages/Settings/SettingsPage'));
const Notifications = lazy(() => import('../view/pages/Notifications/NotificationsPage'));
const Services = lazy(() => import('../view/pages/Services/ServicesPage'));
const AddService = lazy(() => import('../view/pages/Services/AddService'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-page)', color: 'var(--color-primary)', fontSize: '1.2rem', fontWeight: 700 }}>AIRFIX AI...</div>}>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="bookings/new" element={<AddBooking />} />
                    <Route path="technicians" element={<Technicians />} />
                    <Route path="services" element={<Services />} />
                    <Route path="services/new" element={<AddService />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="notifications" element={<Notifications />} />
                </Route>

                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
