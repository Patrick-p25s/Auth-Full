import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Chargement...</p>; // évite une redirection prématurée

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
