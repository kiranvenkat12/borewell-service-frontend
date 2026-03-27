let assignedRequests = [
  {
    id: 1,
    name: "Ravi",
    phone: "9999999999",
    serviceType: "Motor Installation",
    address: "Hyderabad",
    description: "Motor not working",
    status: "pending",
  },
  {
    id: 2,
    name: "Kiran",
    phone: "8888888888",
    serviceType: "Borewell Repair",
    address: "Vijayawada",
    description: "Low water flow",
    status: "pending",
  },
];

// Get assigned requests
export const getAssignedRequests = () => {
  return Promise.resolve({ data: assignedRequests });
};

// Start work
export const startRequest = (id) => {
  assignedRequests = assignedRequests.map((req) =>
    req.id === id ? { ...req, status: "in-progress" } : req
  );
  return Promise.resolve({ message: "Work started" });
};

// Complete work
export const completeRequest = (id) => {
  assignedRequests = assignedRequests.filter((req) => req.id !== id);
  return Promise.resolve({ message: "Work completed" });
};