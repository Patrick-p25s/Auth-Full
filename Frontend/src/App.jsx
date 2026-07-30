import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./page/Home";
import Login from "./page/Login";
import ProtecteRoute from "./route/ProtectedRoute";
import Dashboard from "./page/Dashboard";
import Register from "./page/Register";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtecteRoute>
                <Dashboard />
              </ProtecteRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
