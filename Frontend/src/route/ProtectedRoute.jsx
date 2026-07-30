import useAuth from "../context/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtecteRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Chargement ...</h1>;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
