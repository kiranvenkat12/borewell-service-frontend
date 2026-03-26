// 🔥 Dummy Data
let requests = [
  {
    id: 1,
    name: "Ravi",
    phone: "9876543210",
    serviceType: "Borewell Repair",
    borewellDepth: "120ft",
    address: "123 Street",
    area: "Sector 21",
    pinCode: "110011",
    description: "Motor not working",
    status: "pending",
  },
  {
    id: 2,
    name: "Kiran",
    phone: "9123456780",
    serviceType: "Motor Repair",
    borewellDepth: "",
    address: "45 Road",
    area: "Sector 10",
    pinCode: "110022",
    description: "",
    status: "completed",
  },
];

let workers = [
  { id: 101, name: "Worker A" },
  { id: 102, name: "Worker B" },
];

// 🔥 APIs
export const getAllRequests = () => Promise.resolve({ data: requests });
export const getAllWorkers = () => Promise.resolve({ data: workers });

export const assignWorker = (requestId, workerId) => {
  return new Promise((resolve) => {
    requests = requests.map((req) =>
      req.id === Number(requestId)
        ? { ...req, workerId, status: "assigned" }
        : req
    );
    resolve({ message: "Worker assigned" });
  });
};

export const getAssignedRequests = () => {
  return Promise.resolve({
    data: requests.filter((req) => req.status === "assigned"),
  });
};

export const deleteCompleted = (id) => {
  return new Promise((resolve) => {
    if (id) {
      requests = requests.filter((req) => req.id !== id);
    } else {
      requests = requests.filter((req) => req.status !== "completed");
    }
    resolve({ message: "Completed requests removed" });
  });
};