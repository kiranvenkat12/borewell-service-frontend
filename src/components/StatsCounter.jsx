import { useEffect, useRef, useState } from "react";
import "./StatsCounter.css";

const StatsCounter = () => {
  const [requests, setRequests] = useState(300);
  const [workers, setWorkers] = useState(250);
  const [visible, setVisible] = useState(false);

  const sectionRef = useRef(null);

  // 🔥 Scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 🔥 Daily random increment
  useEffect(() => {
    const reqIncrease = Math.floor(Math.random() * 7) + 1; // 1–7
    const workerIncrease = Math.floor(Math.random() * 3) + 1; // 1–3

    setRequests((prev) => prev + reqIncrease);
    setWorkers((prev) => prev + workerIncrease);
  }, []);

  // 🔥 Animation logic
  const animateCount = (target) => {
    let start = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 10);

    return new Promise((resolve) => {
      let current = 0;
      const timer = setInterval(() => {
        current += Math.ceil(target / 50);

        if (current >= target) {
          clearInterval(timer);
          resolve(target);
        } else {
          resolve(current);
        }
      }, stepTime);
    });
  };

  const [displayReq, setDisplayReq] = useState(0);
  const [displayWorkers, setDisplayWorkers] = useState(0);

  useEffect(() => {
    if (visible) {
      let req = 0;
      let worker = 0;

      const reqInterval = setInterval(() => {
        req += Math.ceil(requests / 50);
        if (req >= requests) {
          req = requests;
          clearInterval(reqInterval);
        }
        setDisplayReq(req);
      }, 30);

      const workerInterval = setInterval(() => {
        worker += Math.ceil(workers / 50);
        if (worker >= workers) {
          worker = workers;
          clearInterval(workerInterval);
        }
        setDisplayWorkers(worker);
      }, 30);
    }
  }, [visible, requests, workers]);

  return (
    <div className="stats-container" ref={sectionRef}>
      <h2 className="stats-title">Our Impact</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{displayReq}+</h3>
          <p>Service Requests Handled</p>
        </div>

        <div className="stat-card">
          <h3>{displayWorkers}+</h3>
          <p>Skilled Workers Available</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;