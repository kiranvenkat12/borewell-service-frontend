import axios from "axios";

const API = "http://127.0.0.1:8000/admin";

// 🔥 REGISTER
export const registerAdmin = async (data) => {
  try {
    const res = await axios.post(`${API}/`, {
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

// 🔥 LOGIN
export const loginAdmin = async (data) => {
  try {
    const res = await axios.post(`${API}/login`, {
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