import axios from "axios";

const API_URL = "http://localhost:8080/api/phases";

export const getPhases = () => axios.get(API_URL);
export const addPhase = (phase) => axios.post(API_URL, phase);
export const updatePhase = (id, phase) => axios.put(`${API_URL}/${id}`, phase);
export const deletePhase = (id) => axios.delete(`${API_URL}/${id}`);
 