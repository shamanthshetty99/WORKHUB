import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../api/auth.service';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const menuItems = user?.role === 'ADMIN' ? [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/employees', label: 'Employees', icon: '👥' },
    { path: '/timeoff', label: 'Time-Off', icon: '🌴' },
    { path: '/profile', label: 'My Profile', icon: '👤' },
    { path: '/reports', label: 'Reports', icon: '📈' },
  ] : [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/timeoff', label: 'Time-Off', icon: '🌴' },
    { path: '/profile', label: 'My Profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition">
                W
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                WorkHub
              </span>
            </Link>

            {/* Menu Items */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-900">{user?.firstName} {user?.lastName}</span>
                <span className="text-xs text-gray-500 flex items-center">
                  {user?.role === 'ADMIN' ? '👑 Administrator' : '👤 Employee'}
                </span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                W
              </div>
              <span className="text-lg font-bold text-gray-900">WorkHub</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600">
                © 2025 WorkHub. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Modern Employee Self-Service Portal
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;