import axios from "axios";

const API = "http://127.0.0.1:8000/worker-registers";

// 🔥 Register Worker
export const registerWorker = async (data) => {
  try {
    const res = await axios.post(`${API}/workers`, data); // note: /workers
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};

// 🔥 Login Worker
export const loginWorker = async (payload) => {
  try {
    const res = await axios.post(`${API}/login`, payload); // note: /login
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};