import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditTrailView = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/audit")
      .then((res) => setLogs(res.data))
      .catch(() => console.error("Failed to load audit logs"));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Audit Trail</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Entity</th>
            <th className="border p-2">Action</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td className="border p-2">{log.entityType}</td>
              <td className="border p-2">{log.action}</td>
              <td className="border p-2">{log.performedBy}</td>
              <td className="border p-2">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="border p-2">{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTrailView;
