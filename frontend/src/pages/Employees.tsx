import React, { useState, useEffect } from 'react';
import { Employee } from '../api/employee.service';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    role: 'EMPLOYEE',
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    setLoading(true);
    // Mock data
    setTimeout(() => {
      const mockEmployees: Employee[] = [
        {
          id: 1,
          employeeCode: 'EMP001',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@company.com',
          phone: '+1-555-0101',
          department: 'Administration',
          position: 'System Administrator',
          role: 'ADMIN',
          hireDate: '2023-01-15',
          salary: 95000,
          isActive: true,
        },
        {
          id: 7,
          employeeCode: 'EMP007',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@company.com',
          phone: '+1-555-0107',
          department: 'Engineering',
          position: 'Software Engineer',
          role: 'EMPLOYEE',
          hireDate: '2023-03-10',
          salary: 75000,
          isActive: true,
        },
        {
          id: 8,
          employeeCode: 'EMP008',
          firstName: 'Emily',
          lastName: 'Davis',
          email: 'emily.davis@company.com',
          phone: '+1-555-0108',
          department: 'Marketing',
          position: 'Marketing Specialist',
          role: 'EMPLOYEE',
          hireDate: '2023-04-22',
          salary: 65000,
          isActive: true,
        },
        {
          id: 9,
          employeeCode: 'EMP009',
          firstName: 'David',
          lastName: 'Wilson',
          email: 'david.wilson@company.com',
          phone: '+1-555-0109',
          department: 'Engineering',
          position: 'Senior Developer',
          role: 'EMPLOYEE',
          hireDate: '2022-11-05',
          salary: 85000,
          isActive: true,
        },
        {
          id: 10,
          employeeCode: 'EMP010',
          firstName: 'Lisa',
          lastName: 'Anderson',
          email: 'lisa.anderson@company.com',
          phone: '+1-555-0110',
          department: 'HR',
          position: 'HR Manager',
          role: 'EMPLOYEE',
          hireDate: '2023-02-14',
          salary: 70000,
          isActive: true,
        },
        {
          id: 11,
          employeeCode: 'EMP011',
          firstName: 'Jennifer',
          lastName: 'Garcia',
          email: 'jennifer.garcia@company.com',
          phone: '+1-555-0111',
          department: 'Sales',
          position: 'Sales Representative',
          role: 'EMPLOYEE',
          hireDate: '2023-05-18',
          salary: 60000,
          isActive: true,
        },
      ];
      setEmployees(mockEmployees);
      setLoading(false);
    }, 500);
  };

  const handleAddEmployee = () => {
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email) {
      alert('Please fill in all required fields');
      return;
    }

    const employee: Employee = {
      id: employees.length + 1,
      employeeCode: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      ...newEmployee,
      hireDate: new Date().toISOString().split('T')[0],
      salary: 60000,
      isActive: true,
    };

    setEmployees([...employees, employee]);
    setShowAddModal(false);
    setNewEmployee({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      role: 'EMPLOYEE',
    });
    alert('Employee added successfully!');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      alert('Employee deleted successfully!');
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
            <p className="text-gray-600 mt-1">Manage your team members</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium shadow-lg transition"
          >
            + Add Employee
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search employees by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Employee Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading employees...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{employee.firstName} {employee.lastName}</h3>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${employee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Email:</span>
                    <span className="text-gray-900 truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Phone:</span>
                    <span className="text-gray-900">{employee.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Department:</span>
                    <span className="text-gray-900">{employee.department}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Role:</span>
                    <span className="font-semibold text-purple-600">{employee.role}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedEmployee(employee)}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredEmployees.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500 text-lg">No employees found</p>
          </div>
        )}

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Employee</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={newEmployee.firstName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={newEmployee.lastName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="john.doe@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="+1-555-0123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Engineering"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewEmployee({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      department: '',
                      position: '',
                      role: 'EMPLOYEE',
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEmployee}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium transition"
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Employee Modal */}
        {selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Employee Details</h2>
              
              <div className="flex items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {selectedEmployee.firstName.charAt(0)}{selectedEmployee.lastName.charAt(0)}
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedEmployee.firstName} {selectedEmployee.lastName}</h3>
                  <p className="text-gray-600">{selectedEmployee.position}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${selectedEmployee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedEmployee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Employee Code</p>
                  <p className="font-semibold text-gray-900">{selectedEmployee.employeeCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{selectedEmployee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedEmployee.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-semibold text-gray-900">{selectedEmployee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold text-purple-600">{selectedEmployee.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hire Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedEmployee.hireDate).toLocaleDateString()}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmployee(null)}
                className="mt-6 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;