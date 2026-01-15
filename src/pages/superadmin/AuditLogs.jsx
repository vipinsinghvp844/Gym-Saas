

const AuditLogs = () => {
  const logs = [
    { id: '1', user: 'Admin User', action: 'Created gym', target: 'PowerFit Gym', timestamp: '2024-01-22 14:35:22', ip: '192.168.1.1' },
    { id: '2', user: 'Admin User', action: 'Updated plan', target: 'Pro Plan', timestamp: '2024-01-22 14:20:15', ip: '192.168.1.1' },
    { id: '3', user: 'System', action: 'Payment processed', target: 'INV-1234', timestamp: '2024-01-22 14:00:00', ip: 'system' },
  ];

  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Audit Logs</h1>
        <p className="text-sm text-slate-500 mt-1">Track all system activities and changes</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Target</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-6 py-4"><p className="text-sm font-medium text-slate-900">{log.user}</p></td>
                <td className="px-6 py-4"><p className="text-sm text-slate-700">{log.action}</p></td>
                <td className="px-6 py-4"><p className="text-sm text-slate-700">{log.target}</p></td>
                <td className="px-6 py-4"><p className="text-sm font-mono text-slate-600">{log.timestamp}</p></td>
                <td className="px-6 py-4"><p className="text-sm font-mono text-slate-600">{log.ip}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditLogs;