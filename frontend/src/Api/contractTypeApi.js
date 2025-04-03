import axios from "axios";

const API_URL = "http://localhost:8080/api/contract-types";

export const getContractTypes = () => axios.get(API_URL);
export const addContractType = (contractType) => axios.post(API_URL, contractType);
export const updateContractType = (id, contractType) => axios.put(`${API_URL}/${id}`, contractType);
export const deleteContractType = (id) => axios.delete(`${API_URL}/${id}`);
 