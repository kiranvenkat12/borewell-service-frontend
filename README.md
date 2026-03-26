src/
│
├── components/          # Reusable UI
│   ├── Navbar.jsx
│   ├── RequestCard.jsx
│   ├── WorkerCard.jsx
│
├── pages/
│   ├── Home.jsx
│   │
│   ├── admin/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminRegister.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ManageWorkers.jsx
│   │
│   ├── worker/
│       ├── WorkerLogin.jsx
│       ├── WorkerDashboard.jsx
│
├── services/            # API calls (VERY IMPORTANT)
│   ├── api.js
│   ├── adminService.js
│   ├── workerService.js
│   ├── requestService.js
│
├── context/             # Auth state
│   ├── AuthContext.jsx
│
├── routes/
│   ├── AppRoutes.jsx
│
├── utils/
│   ├── constants.js
│
├── App.jsx
├── main.jsx