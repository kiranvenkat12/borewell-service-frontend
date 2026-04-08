import axios from "axios";

export const loginCustomer = async (data) => {
  try {
    const response = await axios.post(
      "https://borewell-service-production.up.railway.app/customer-registrations/login",
      data
    );
    return response.data;   // ✅ VERY IMPORTANT
  } catch (error) {
    throw error.response?.data || error;
  }
};