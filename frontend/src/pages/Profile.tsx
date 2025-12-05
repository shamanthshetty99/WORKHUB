import React, { useState, useEffect } from 'react';
import { authService } from '../api/auth.service';

const Profile: React.FC = () => {
  const user = authService.getCurrentUser();
  const [editing, setEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    department: '',
    position: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsAlerts: false,
    desktopNotifications: true,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const storedProfile = localStorage.getItem(`profile_${user?.employeeId}`);
    const storedPreferences = localStorage.getItem(`preferences_${user?.employeeId}`);
    
    if (storedProfile) {
      setFormData(JSON.parse(storedProfile));
    }
    
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    }
  };

  const handleSave = () => {
    localStorage.setItem(`profile_${user?.employeeId}`, JSON.stringify(formData));
    
    // Update user in localStorage
    const currentUser = authService.getCurrentUser();
    const updatedUser = {
      ...currentUser,
      firstName: formData.firstName,
      lastName: formData.lastName,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setEditing(false);
    alert('✅ Profile updated successfully!');
    
    // Refresh page to show updated name
    window.location.reload();
  };

  const handlePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('❌ Please fill in all password fields');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('❌ New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert('❌ Password must be at least 8 characters long');
      return;
    }
    
    // In a real app, this would call the backend API
    alert('✅ Password changed successfully!');
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handlePreferenceChange = (key: string) => {
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key as keyof typeof preferences],
    };
    setPreferences(newPreferences);
    localStorage.setItem(`preferences_${user?.employeeId}`, JSON.stringify(newPreferences));
    alert('✅ Preference updated!');
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600"></div>
          
          <div className="px-8 pb-8">
            <div className="flex items-end -mt-16 mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-white flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
              </div>
              <div className="ml-6 mb-2 flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-gray-600">{user?.role}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  ✓ Active
                </span>
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="mb-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium transition shadow-md"
              >
                {editing ? '✕ Cancel' : '✏️ Edit Profile'}
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 transition"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 transition"
                  placeholder="Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 transition"
                  placeholder="Software Engineer"
                />
              </div>
            </div>

            {editing && (
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setEditing(false);
                    loadProfile();
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium transition shadow-md"
                >
                  💾 Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">🔒</span>
              Security
            </h3>
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium mb-3 transition"
            >
              🔑 Change Password
            </button>
            <button 
              onClick={() => alert('🔐 Two-Factor Authentication: Feature coming soon!')}
              className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition"
            >
              📱 Enable Two-Factor Authentication
            </button>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">⚙️</span>
              Preferences
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                   onClick={() => handlePreferenceChange('emailNotifications')}>
                <span className="text-gray-700 font-medium">Email Notifications</span>
                <input 
                  type="checkbox" 
                  checked={preferences.emailNotifications}
                  onChange={() => {}}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                   onClick={() => handlePreferenceChange('smsAlerts')}>
                <span className="text-gray-700 font-medium">SMS Alerts</span>
                <input 
                  type="checkbox" 
                  checked={preferences.smsAlerts}
                  onChange={() => {}}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                   onClick={() => handlePreferenceChange('desktopNotifications')}>
                <span className="text-gray-700 font-medium">Desktop Notifications</span>
                <input 
                  type="checkbox" 
                  checked={preferences.desktopNotifications}
                  onChange={() => {}}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Change Password</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Password Requirements:</strong>
                    <br />• At least 8 characters long
                    <br />• Contains uppercase and lowercase letters
                    <br />• Contains numbers and special characters
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium transition"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;