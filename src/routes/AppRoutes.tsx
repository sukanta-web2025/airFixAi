import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';

const Login = lazy(() => import('../view/pages/Login/Login'));
const Dashboard = lazy(() => import('../view/pages/Dashboard/Dashboard').then(module => ({ default: module.Dashboard })));
const Bookings = lazy(() => import('../view/pages/Bookings/Bookings').then(module => ({ default: module.BookingsView })));
const AddBooking = lazy(() => import('../view/pages/Bookings/AddBooking'));
const BookingDetails = lazy(() => import('../view/pages/Bookings/ViewBooking').then(module => ({ default: module.ViewBooking })));

const DiagnosisManagement = lazy(() => import('../view/pages/Diagnosis/DiagnosisManagement'));
const DiagnosisPreview = lazy(() => import('../view/pages/Diagnosis/DiagnosisPreview'));
const AddEditDiagnosis = lazy(() => import('../view/pages/Diagnosis/AddEditDiagnosis'));
const UserManagement = lazy(() => import('../view/pages/Users/UserManagement').then(module => ({ default: module.UserManagement })));
const UserDetails = lazy(() => import('../view/pages/Users/UserDetails').then(module => ({ default: module.UserDetails })));

const Profile = lazy(() => import('../view/pages/Profile/Profile').then(module => ({ default: module.default })));
const Settings = lazy(() => import('../view/pages/Settings/SettingsPage'));
const Notifications = lazy(() => import('../view/pages/Notifications/NotificationsPage'));
const Services = lazy(() => import('../view/pages/Services/ServicesPage'));
const AddService = lazy(() => import('../view/pages/Services/AddService'));

const VideoManagement = lazy(() => import('../view/pages/Videos/VideoManagement'));
const AddEditVideo = lazy(() => import('../view/pages/Videos/AddEditVideo'));
const VideoGallery = lazy(() => import('../view/pages/Videos/VideoGallery'));
const ChatPage = lazy(() => import('../view/pages/Chat/ChatPage'));

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
                    <Route path="bookings/:id" element={<BookingDetails />} />
                    <Route path="bookings/edit/:id" element={<AddBooking />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="users/:id" element={<UserDetails />} />
                    <Route path="diagnosis" element={<DiagnosisManagement />} />
                    <Route path="diagnosis/add" element={<AddEditDiagnosis />} />
                    <Route path="diagnosis/edit/:id" element={<AddEditDiagnosis />} />
                    <Route path="diagnosis/preview" element={<DiagnosisPreview />} />
                    <Route path="services" element={<Services />} />
                    <Route path="services/new" element={<AddService />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="videos" element={<VideoManagement />} />
                    <Route path="videos/add" element={<AddEditVideo />} />
                    <Route path="videos/edit/:id" element={<AddEditVideo />} />
                    <Route path="videos/preview" element={<VideoGallery />} />
                    <Route path="chat" element={<ChatPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
