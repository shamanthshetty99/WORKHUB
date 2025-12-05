import React, { useState, useEffect } from 'react';
import { TimeOffRequest } from '../api/timeoff.service';
import { authService } from '../api/auth.service';

const TimeOff: React.FC = () => {
  const [requests, setRequests] = useState<TimeOffRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [newRequest, setNewRequest] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'VACATION' as const,
  });
  const user = authService.getCurrentUser();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    setLoading(true);
    
    const storedRequests = localStorage.getItem('timeOffRequests');
    
    if (storedRequests) {
      const allRequests = JSON.parse(storedRequests);
      
      if (user?.role === 'ADMIN') {
        setRequests(allRequests);
      } else {
        setRequests(allRequests.filter((req: TimeOffRequest) => req.employeeId === user?.employeeId));
      }
    } else {
      const defaultRequests: TimeOffRequest[] = [
        {
          id: 1,
          employeeId: 7,
          startDate: '2025-12-10',
          endDate: '2025-12-15',
          reason: 'Family vacation',
          status: 'PENDING',
          type: 'VACATION',
        },
        {
          id: 2,
          employeeId: 7,
          startDate: '2025-11-20',
          endDate: '2025-11-22',
          reason: 'Medical appointment',
          status: 'APPROVED',
          type: 'SICK',
        },
        {
          id: 3,
          employeeId: 8,
          startDate: '2025-12-05',
          endDate: '2025-12-07',
          reason: 'Personal matter',
          status: 'PENDING',
          type: 'PERSONAL',
        },
      ];
      
      localStorage.setItem('timeOffRequests', JSON.stringify(defaultRequests));
      
      if (user?.role === 'ADMIN') {
        setRequests(defaultRequests);
      } else {
        setRequests(defaultRequests.filter(req => req.employeeId === user?.employeeId));
      }
    }
    
    setLoading(false);
  };

  const saveRequests = (updatedRequests: TimeOffRequest[]) => {
    localStorage.setItem('timeOffRequests', JSON.stringify(updatedRequests));
    
    if (user?.role === 'ADMIN') {
      setRequests(updatedRequests);
    } else {
      setRequests(updatedRequests.filter(req => req.employeeId === user?.employeeId));
    }
  };

  const handleCreateRequest = () => {
    if (!newRequest.startDate || !newRequest.endDate || !newRequest.reason) {
      alert('Please fill in all fields');
      return;
    }
    
    const storedRequests = JSON.parse(localStorage.getItem('timeOffRequests') || '[]');
    const maxId = storedRequests.length > 0 ? Math.max(...storedRequests.map((r: TimeOffRequest) => r.id || 0)) : 0;
    
    const newReq: TimeOffRequest = {
      id: maxId + 1,
      employeeId: user?.employeeId || 1,
      ...newRequest,
      status: 'PENDING',
    };
    
    const updatedRequests = [...storedRequests, newReq];
    saveRequests(updatedRequests);
    
    setShowCreateModal(false);
    setNewRequest({ startDate: '', endDate: '', reason: '', type: 'VACATION' });
    alert('✅ Request submitted successfully! Admin will review it.');
  };

  const handleStatusUpdate = (id: number, status: string) => {
    const storedRequests = JSON.parse(localStorage.getItem('timeOffRequests') || '[]');
    const updatedRequests = storedRequests.map((req: TimeOffRequest) => 
      req.id === id ? { ...req, status: status as any } : req
    );
    saveRequests(updatedRequests);
    alert(`✅ Request ${status.toLowerCase()} successfully!`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      const storedRequests = JSON.parse(localStorage.getItem('timeOffRequests') || '[]');
      const updatedRequests = storedRequests.filter((req: TimeOffRequest) => req.id !== id);
      saveRequests(updatedRequests);
      alert('✅ Request deleted successfully!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'VACATION': return '🌴';
      case 'SICK': return '🏥';
      case 'PERSONAL': return '👤';
      default: return '📋';
    }
  };

  const getEmployeeName = (employeeId: number) => {
    const employees: Record<number, string> = {
      1: 'Admin User',
      7: 'John Doe',
      8: 'Emily Davis',
      9: 'David Wilson',
      10: 'Lisa Anderson',
      11: 'Jennifer Garcia',
    };
    return employees[employeeId] || `Employee #${employeeId}`;
  };

  const filteredRequests = filterStatus === 'ALL' 
    ? requests 
    : requests.filter(req => req.status === filterStatus);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Time-Off Requests</h1>
            <p className="text-gray-600 mt-1">
              {user?.role === 'ADMIN' ? 'Manage all employee leave requests' : 'Manage your leave and vacation requests'}
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 font-medium shadow-lg transition"
          >
            + New Request
          </button>
        </div>

        {/* Stats - Only for Admin */}
        {user?.role === 'ADMIN' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition ${filterStatus === 'ALL' ? 'ring-2 ring-purple-500' : ''}`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mr-3">📋</div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setFilterStatus('PENDING')}
              className={`bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition ${filterStatus === 'PENDING' ? 'ring-2 ring-yellow-500' : ''}`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl mr-3">⏳</div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{requests.filter(r => r.status === 'PENDING').length}</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setFilterStatus('APPROVED')}
              className={`bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition ${filterStatus === 'APPROVED' ? 'ring-2 ring-green-500' : ''}`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mr-3">✅</div>
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">{requests.filter(r => r.status === 'APPROVED').length}</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setFilterStatus('REJECTED')}
              className={`bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition ${filterStatus === 'REJECTED' ? 'ring-2 ring-red-500' : ''}`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl mr-3">❌</div>
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">{requests.filter(r => r.status === 'REJECTED').length}</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading requests...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-5xl mt-2">{getTypeIcon(request.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2 flex-wrap">
                        <h3 className="font-bold text-xl text-gray-900">{request.type}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        {user?.role === 'ADMIN' && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                            👤 {getEmployeeName(request.employeeId)}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-3 text-base">{request.reason}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center">
                          <span className="mr-1">📅</span>
                          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <span className="mr-1">⏱️</span>
                          {Math.ceil((new Date(request.endDate).getTime() - new Date(request.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons - ROLE-BASED */}
                  <div className="flex flex-col space-y-2 ml-4">
                    {/* ADMIN: Can approve/reject PENDING requests */}
                    {user?.role === 'ADMIN' && request.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(request.id!, 'APPROVED')}
                          className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition shadow-md hover:shadow-lg"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request.id!, 'REJECTED')}
                          className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition shadow-md hover:shadow-lg"
                        >
                          ✗ Reject
                        </button>
                      </>
                    )}
                    
                    {/* EMPLOYEE: Can only delete their OWN PENDING requests */}
                    {user?.role !== 'ADMIN' && request.status === 'PENDING' && request.employeeId === user?.employeeId && (
                      <button
                        onClick={() => handleDelete(request.id!)}
                        className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition shadow-md hover:shadow-lg"
                      >
                        🗑️ Delete
                      </button>
                    )}
                    
                    {/* Status indicator for non-pending requests */}
                    {request.status !== 'PENDING' && (
                      <div className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-center text-sm font-medium">
                        {request.status === 'APPROVED' ? '✅ Approved' : '❌ Rejected'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredRequests.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500 text-lg mb-4">
              {filterStatus === 'ALL' ? 'No time-off requests found' : `No ${filterStatus.toLowerCase()} requests`}
            </p>
            <button
              onClick={() => {
                if (user?.role === 'ADMIN' && filterStatus !== 'ALL') {
                  setFilterStatus('ALL');
                } else {
                  setShowCreateModal(true);
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 font-medium"
            >
              {user?.role === 'ADMIN' && filterStatus !== 'ALL' ? 'View All Requests' : 'Create Your First Request'}
            </button>
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">New Time-Off Request</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="VACATION">Vacation</option>
                    <option value="SICK">Sick Leave</option>
                    <option value="PERSONAL">Personal</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newRequest.startDate}
                    onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newRequest.endDate}
                    onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    min={newRequest.startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                  <textarea
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows={3}
                    placeholder="Describe your reason for time off..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewRequest({ startDate: '', endDate: '', reason: '', type: 'VACATION' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRequest}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 font-medium transition"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeOff;