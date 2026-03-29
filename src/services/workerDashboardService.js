import axios from "axios";

const API_URL = "http://localhost:8000/service-requests";

// ✅ Get assigned tasks for logged-in worker
export const getAssignedRequests = async () => {
  const workerId = localStorage.getItem("workerId");
  const token = localStorage.getItem("workerToken");

  if (!workerId || !token) {
    throw new Error("Worker not logged in");
  }

  try {
    const res = await axios.get(`${API_URL}/worker/${workerId}/requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

// ✅ Start a task
export const startRequest = async (service_request_id) => {
  const token = localStorage.getItem("workerToken");
  return axios.put(
    `${API_URL}/${service_request_id}/start`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// ✅ Complete a task
export const completeRequest = async (service_request_id) => {
  const token = localStorage.getItem("workerToken");
  return axios.put(
    `${API_URL}/${service_request_id}/complete`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};