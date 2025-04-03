import axios from "axios";

const API_URL = "http://localhost:8080/api/milestone-phases";

export const getMilestonePhases = () => axios.get(API_URL);
export const addMilestonePhase = (milestonePhase) => axios.post(API_URL, milestonePhase);
export const updateMilestonePhase = (id, milestonePhase) => axios.put(`${API_URL}/${id}`, milestonePhase);
export const deleteMilestonePhase = (id) => axios.delete(`${API_URL}/${id}`);
