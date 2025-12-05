import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import TimeOff from './pages/TimeOff';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import Layout from './components/Layout';
import { authService } from './api/auth.service';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const user = authService.getCurrentUser();
  if (!authService.isAuthenticated()) return <Navigate to="/login" />;
  if (user?.role !== 'ADMIN') return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/employees" element={
          <AdminRoute>
            <Layout><Employees /></Layout>
          </AdminRoute>
        } />
        
        <Route path="/timeoff" element={
          <ProtectedRoute>
            <Layout><TimeOff /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout><Profile /></Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/reports" element={
          <AdminRoute>
            <Layout><Reports /></Layout>
          </AdminRoute>
        } />
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;