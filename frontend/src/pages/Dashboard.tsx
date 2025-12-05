import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/auth.service';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Total Employees', value: '156', icon: '👥', color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Pending Requests', value: '8', icon: '📋', color: 'from-orange-500 to-orange-600', change: '-3%' },
    { label: 'On Leave Today', value: '12', icon: '🌴', color: 'from-green-500 to-green-600', change: '+5%' },
    { label: 'Active Projects', value: '24', icon: '💼', color: 'from-purple-500 to-purple-600', change: '+8%' },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'submitted a leave request', time: '5 mins ago', avatar: '👤' },
    { user: 'Sarah Smith', action: 'updated their profile', time: '15 mins ago', avatar: '👩' },
    { user: 'Mike Johnson', action: 'clocked in for the day', time: '1 hour ago', avatar: '👨' },
    { user: 'Emma Wilson', action: 'completed onboarding', time: '2 hours ago', avatar: '👩‍💼' },
  ];

  const upcomingEvents = [
    { title: 'Team Meeting', date: 'Today, 2:00 PM', type: 'meeting', color: 'bg-blue-100 text-blue-800' },
    { title: 'Project Deadline', date: 'Tomorrow', type: 'deadline', color: 'bg-red-100 text-red-800' },
    { title: 'Company Lunch', date: 'Friday, 12:00 PM', type: 'event', color: 'bg-green-100 text-green-800' },
  ];

  // Quick actions based on role
  const quickActions = user?.role === 'ADMIN' ? [
    { label: 'Add Employee', icon: '➕', color: 'from-blue-500 to-blue-600', path: '/employees' },
    { label: 'New Request', icon: '📝', color: 'from-green-500 to-green-600', path: '/timeoff' },
    { label: 'View Reports', icon: '📈', color: 'from-orange-500 to-orange-600', path: '/reports' },
    { label: 'Settings', icon: '⚙️', color: 'from-purple-500 to-purple-600', path: '/profile' },
  ] : [
    { label: 'New Request', icon: '📝', color: 'from-green-500 to-green-600', path: '/timeoff' },
    { label: 'My Profile', icon: '👤', color: 'from-blue-500 to-blue-600', path: '/profile' },
    { label: 'Time Off History', icon: '📅', color: 'from-purple-500 to-purple-600', path: '/timeoff' },
    { label: 'Help & Support', icon: '❓', color: 'from-orange-500 to-orange-600', path: '/profile' },
  ];

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.firstName}! 👋</h1>
            <p className="text-white/90">Here's what's happening with your team today.</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-2xl font-bold">{currentTime.toLocaleTimeString()}</p>
            <p className="text-white/90">{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl shadow-lg`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl mr-4">
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    <span className="font-bold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📅</span>
            Upcoming Events
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 border-l-4 border-purple-500 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-gray-900">{event.title}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.color}`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{event.date}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => alert('Calendar feature coming soon!')}
            className="mt-4 w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium transition"
          >
            View All Events
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button 
            key={index}
            onClick={() => navigate(action.path)}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition text-center group"
          >
            <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition shadow-lg`}>
              {action.icon}
            </div>
            <p className="font-semibold text-gray-900">{action.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;