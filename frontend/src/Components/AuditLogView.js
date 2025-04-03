import React, { useState, useEffect } from "react";
import { getAuditLogs } from "../api/auditLogApi";

const AuditLogView = ({ entityType }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadAuditLogs();
  }, [entityType]);

  const loadAuditLogs = async () => {
    const response = await getAuditLogs(entityType);
    setLogs(response.data);
  };

  return (
    <div>
      <h3>Audit Trail for {entityType}</h3>
      {logs.length === 0 ? (
        <p>No audit logs available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>User</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.action}</td>
                <td>{log.performedBy}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AuditLogView;
