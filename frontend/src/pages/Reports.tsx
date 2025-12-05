import React from 'react';

const Reports: React.FC = () => {
  const reports = [
    { title: 'Employee Attendance', description: 'Monthly attendance summary', icon: '📊', color: 'from-blue-500 to-blue-600' },
    { title: 'Leave Balance', description: 'Current leave balance report', icon: '🌴', color: 'from-green-500 to-green-600' },
    { title: 'Payroll Summary', description: 'Monthly payroll breakdown', icon: '💰', color: 'from-yellow-500 to-yellow-600' },
    { title: 'Performance Reviews', description: 'Quarterly performance data', icon: '⭐', color: 'from-purple-500 to-purple-600' },
    { title: 'Department Analytics', description: 'Department-wise statistics', icon: '📈', color: 'from-pink-500 to-pink-600' },
    { title: 'Turnover Rate', description: 'Employee retention metrics', icon: '🔄', color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate and download reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition group cursor-pointer">
              <div className={`w-16 h-16 bg-gradient-to-br ${report.color} rounded-lg flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition shadow-lg`}>
                {report.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-gray-600 mb-4">{report.description}</p>
              <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium">
                Generate Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;