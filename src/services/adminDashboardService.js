import axios from "axios";

const API = "http://127.0.0.1:8000";

// 🔥 Helper: attach token
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 🔥 GET ALL SERVICE REQUESTS
export const getAllRequests = async () => {
  try {
    const res = await axios.get(`${API}/service-requests/`, getAuthHeaders());
    return res;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch requests" };
  }
};

// 🔥 GET ALL WORKERS
export const getAllWorkers = async () => {
  try {
    const res = await axios.get(`${API}/worker-registers/workers`, getAuthHeaders());
    return res;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch workers" };
  }
};

// 🔥 ASSIGN WORKER TO REQUEST
export const assignWorker = async (requestId, workerId) => {
  try {
    const res = await axios.put(
      `${API}/service-requests/`, // ✅ FIXED
      {
        request_id: requestId,  // ✅ match backend schema
        worker_id: workerId,
      },
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Assignment failed" };
  }
};

// 🔥 GET ASSIGNED REQUESTS
export const getAssignedRequests = async () => {
  try {
    const res = await axios.get(
      `${API}/service-requests/assigned`,
      getAuthHeaders()
    );
    return res;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch assigned requests" };
  }
};

// 🔥 DELETE COMPLETED REQUESTS
export const deleteCompleted = async (id = null) => {
  try {
    if (id) {
      // delete single
      const res = await axios.delete(
        `${API}/service-requests/${id}`,
        getAuthHeaders()
      );
      return res.data;
    } else {
      // delete all completed
      const res = await axios.delete(
        `${API}/service-requests/completed`,
        getAuthHeaders()
      );
      return res.data;
    }
  } catch (err) {
    throw err.response?.data || { message: "Delete failed" };
  }
};

// 🔥 GET ALL COMPLETED REQUESTS
export const getCompletedRequests = async () => {
  try {
    const res = await axios.get(`${API}/service-requests/completed`, getAuthHeaders());
    return res;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch completed requests" };
  }
};