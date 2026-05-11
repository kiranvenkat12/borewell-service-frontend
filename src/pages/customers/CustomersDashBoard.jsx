import { useEffect, useState } from "react";
import axios from "axios";
import "./CustomersDashboard.css";
import RequestCard from "../../components/RequestCard";
import jsPDF from "jspdf";

const CustomerDashboard = () => {
  const [borewellData, setBorewellData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const token = localStorage.getItem("customerToken");
  const phoneNumber = localStorage.getItem("customerPhone");
  const customerName = localStorage.getItem("customerName") || "Customer";

  // 🔐 Auth Check
  useEffect(() => {
    if (!token || !phoneNumber) {
      window.location.href = "/customer/login";
    }
  }, [token, phoneNumber]);

  // 🔄 Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
         `https://borewell-service-production.onrender.com/admin/borewell-info/${phoneNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBorewellData(res.data || []);
    } catch {
      setBorewellData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phoneNumber) fetchData();
  }, [token, phoneNumber]);

  // 🔓 Logout
  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    localStorage.clear();
    window.location.href = "/";
  };

  // 📄 PDF DOWNLOAD
  const downloadPDF = (bore) => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Borewell Report", 10, y);
    y += 10;

    doc.setFontSize(12);

    Object.entries(bore.borewell_data || {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        doc.text(`${key}: ${value}`, 10, y);
        y += 7;
      }
    });

    y += 5;

    if (bore.analysis?.status) {
      doc.text(`Status: ${bore.analysis.status}`, 10, y);
      y += 7;
    }

    if (bore.analysis?.issues?.length) {
      doc.text(`Issues: ${bore.analysis.issues.join(", ")}`, 10, y);
      y += 7;
    }

    const addList = (title, list) => {
      if (list?.length) {
        doc.text(title, 10, y);
        y += 6;
        list.forEach((item) => {
          doc.text(`- ${item}`, 12, y);
          y += 6;
        });
      }
    };

    addList("Low Cost Solutions:", bore.analysis?.solutions?.low_cost);
    addList("Medium Cost Solutions:", bore.analysis?.solutions?.medium_cost);
    addList("High Cost Solutions:", bore.analysis?.solutions?.high_cost);

    doc.save("borewell-report.pdf");
  };

  return (
    <div className="dashboard">

      {/* 🔝 HEADER */}
      <div className="top-header">
        <h3>Hello, {customerName}</h3>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* 📌 MAIN HEADER */}
      <div className="main-header">
        <h1>Customer Dashboard</h1>
        <button
          className="request-btn"
          onClick={() => setShowRequestModal(true)}
        >
          + Raise Request
        </button>
      </div>

      {/* 📦 DATA SECTION */}
      {loading ? (
        <div className="data-loader">
          <div className="spinner"></div>
          <p>Fetching your borewell data...</p>
        </div>
      ) : borewellData.length === 0 ? (
        <div className="empty-state">
          <h3>No Borewell Data Yet</h3>
          <p>Our team is working on your borewell inspection.</p>
          <p>You will see complete details here soon.</p>
        </div>
      ) : (
        borewellData.map((bore, index) => (
          <div className="card" key={index}>
            <h2>Borewell #{index + 1}</h2>

            <button
              className="download-btn"
              onClick={() => downloadPDF(bore)}
            >
              Download PDF
            </button>

            <div className="grid">
              {Object.entries(bore.borewell_data || {})
                .filter(([_, v]) => v !== null && v !== "")
                .map(([k, v]) => (
                  <p key={k}>
                    <strong>{k.replace(/_/g, " ")}:</strong> {String(v)}
                  </p>
                ))}
            </div>

            <div className="analysis">
              {bore.analysis?.status && <h3>Status: {bore.analysis.status}</h3>}

              {bore.analysis?.issues?.length > 0 && (
                <p>
                  <strong>Issues:</strong>{" "}
                  {bore.analysis.issues.join(", ")}
                </p>
              )}

              {["low_cost", "medium_cost", "high_cost"].map(
                (type) =>
                  bore.analysis?.solutions?.[type]?.length > 0 && (
                    <div key={type}>
                      <p>
                        <strong>{type.replace("_", " ")}:</strong>
                      </p>
                      <ul>
                        {bore.analysis.solutions[type].map((i, idx) => (
                          <li key={idx}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
            </div>
          </div>
        ))
      )}

      {/* 🔥 MODAL */}
      {showRequestModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <RequestCard
              isModal={true}
              onClose={() => {
                setShowRequestModal(false);
                fetchData(); // 🔥 refresh after submit
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;