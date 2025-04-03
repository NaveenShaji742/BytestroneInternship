import axios from "axios";

const API_URL = "http://localhost:8080/api/audit-logs";

// Get audit logs for a given entity (e.g., "Phase" or "ContractType")
export const getAuditLogs = (entityType) => {
  return axios.get(`${API_URL}/${entityType}`);
};
