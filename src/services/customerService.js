import axios from "axios";

const API = "https://borewell-service-production.up.railway.app/customer-registrations";

export const registerCustomer = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};

export const loginCustomer = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};