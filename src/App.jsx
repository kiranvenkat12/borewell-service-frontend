// App.js
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./services/AuthContext"; // Import AuthProvider

function App() {
  return (
    <AuthProvider>     
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;