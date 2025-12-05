import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/auth.service';

const Login: React.FC = () => {
  const [selectedPortal, setSelectedPortal] = useState<'admin' | 'employee' | null>(null);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(credentials.email, credentials.password);
      
      if (selectedPortal === 'admin' && response.role !== 'ADMIN') {
        setError('You do not have admin privileges. Please use the Employee Portal.');
        setLoading(false);
        return;
      }
      
      if (selectedPortal === 'employee' && response.role === 'ADMIN') {
        setError('Administrators should use the Admin Portal.');
        setLoading(false);
        return;
      }
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPortal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition">
                <span className="text-6xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">W</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">WorkHub</h1>
            <p className="text-xl text-white/90 font-medium">Modern Employee Self-Service Portal</p>
            <p className="text-white/80 mt-2">Choose your portal to get started</p>
          </div>

          {/* Portal Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Admin Portal */}
            <button
              onClick={() => setSelectedPortal('admin')}
              className="group bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition transform hover:-translate-y-2"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-5xl mb-6 shadow-xl group-hover:scale-110 transition">
                  👑
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Admin Portal</h2>
                <p className="text-gray-600 mb-6">Full system access and management</p>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    Employee Management
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    Request Approvals
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    Analytics & Reports
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    System Configuration
                  </li>
                </ul>
                <div className="text-sm text-gray-500 bg-purple-50 rounded-lg p-3">
                  <p className="font-semibold mb-1">Demo Credentials:</p>
                  <p>Email: admin@company.com</p>
                  <p>Password: Admin123!</p>
                </div>
              </div>
            </button>

            {/* Employee Portal */}
            <button
              onClick={() => setSelectedPortal('employee')}
              className="group bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition transform hover:-translate-y-2"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center text-5xl mb-6 shadow-xl group-hover:scale-110 transition">
                  👤
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Employee Portal</h2>
                <p className="text-gray-600 mb-6">Personal dashboard and requests</p>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <span className="text-blue-500 mr-3">✓</span>
                    Personal Dashboard
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-blue-500 mr-3">✓</span>
                    Time-Off Requests
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-blue-500 mr-3">✓</span>
                    Profile Management
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-blue-500 mr-3">✓</span>
                    View Pay Stubs
                  </li>
                </ul>
                <div className="text-sm text-gray-500 bg-blue-50 rounded-lg p-3">
                  <p className="font-semibold mb-1">Demo Credentials:</p>
                  <p>Email: john.doe@company.com</p>
                  <p>Password: Admin123!</p>
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-white/80">
            <p className="text-sm">Secure • Modern • Efficient</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-2xl">
              <span className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">W</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">WorkHub</h1>
          <p className="text-white/90">{selectedPortal === 'admin' ? '👑 Admin Portal' : '👤 Employee Portal'}</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <button
            onClick={() => {
              setSelectedPortal(null);
              setError('');
              setCredentials({ email: '', password: '' });
            }}
            className="mb-6 text-gray-600 hover:text-gray-900 flex items-center transition"
          >
            ← Back to portal selection
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="your.email@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;