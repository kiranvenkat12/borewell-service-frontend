import axios from "axios";

const API = "https://borewell-service-production.up.railway.app";


export const registerAdmin = async (data) => {
  try {
    const res = await axios.post(`${API}/admin/`, {
      name: data.name,
      email: data.email,
      new_password: data.password,
      confirm_password: data.confirmPassword,
      admin_id: data.adminId,
    });
    return res.data;
  } catch (err) {
    console.error("Register Error:", err.response?.data);
    throw err.response?.data || { message: "Register failed" };
  }
};


export const loginAdmin = async (data) => {
  try {
    const res = await axios.post(`${API}/admin/login`, {  // <-- changed here
      email: data.email,
      password: data.password,
    });
    const token = res.data.access_token;
    localStorage.setItem("adminToken", token);
    return res.data;
  } catch (err) {
    console.error("Login Error:", err.response?.data);
    throw err.response?.data || { message: "Login failed" };
  }
};