import { useEffect, useState } from "react";
import { getAllWorkers, assignWorker } from "../services/adminDashboardService";
import "./Worker.css";
const Workers = ({ selectedReq }) => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    const res = await getAllWorkers();
    setWorkers(res.data);
  };

  const handleAssign = async (workerId) => {
    if (!selectedReq) return alert("No request selected");
    await assignWorker(selectedReq, workerId);
    alert("Worker assigned!");
  };

  return (
    <div className="cards">
      {workers.map((w) => (
        <div className="card" key={w.id}>
          <p><b>ID:</b> {w.id}</p>
          <p><b>Name:</b> {w.name}</p>
          {selectedReq && (
            <button onClick={() => handleAssign(w.id)}>Assign Request</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Workers;