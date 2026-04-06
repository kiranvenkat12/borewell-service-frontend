const BASE_URL = "https://borewell-service-production.up.railway.app";
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