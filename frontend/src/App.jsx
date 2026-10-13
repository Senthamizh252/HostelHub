import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/Login';
import StudentDashboard from './pages/student/Dashboard';
import StudentRoom from './pages/student/Room';
import StudentComplaints from './pages/student/Complaints';
import StudentLeaves from './pages/student/Leaves';
import StudentMenu from './pages/student/Menu';
import StudentAnnouncements from './pages/student/Announcements';
import StudentLostFound from './pages/student/LostFound';
import StudentNotifications from './pages/student/Notifications';
import StudentProfile from './pages/student/Profile';
import WardenDashboard from './pages/warden/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/login"
        element={user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <LoginPage />}
      />

      {/* Protected */}
      <Route element={<DashboardLayout />}>
        <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/room" element={<ProtectedRoute allowedRoles={['student']}><StudentRoom /></ProtectedRoute>} />
        <Route path="/student/complaints" element={<ProtectedRoute allowedRoles={['student']}><StudentComplaints /></ProtectedRoute>} />
        <Route path="/student/leaves" element={<ProtectedRoute allowedRoles={['student']}><StudentLeaves /></ProtectedRoute>} />
        <Route path="/student/menu" element={<ProtectedRoute allowedRoles={['student']}><StudentMenu /></ProtectedRoute>} />
        <Route path="/student/announcements" element={<ProtectedRoute allowedRoles={['student']}><StudentAnnouncements /></ProtectedRoute>} />
        <Route path="/student/lost-found" element={<ProtectedRoute allowedRoles={['student']}><StudentLostFound /></ProtectedRoute>} />
        <Route path="/student/notifications" element={<ProtectedRoute allowedRoles={['student']}><StudentNotifications /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />
        <Route path="/student/settings" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />
        <Route path="/warden/dashboard" element={<ProtectedRoute allowedRoles={['warden']}><WardenDashboard /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
