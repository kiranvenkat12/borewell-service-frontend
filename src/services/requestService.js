const BASE_URL = "http://127.0.0.1:8000";

export const createRequest = async (formData) => {
  const res = await fetch(`${BASE_URL}/service-requests/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to create request");
  }

  return res.json();
};