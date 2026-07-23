import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div>
      <h1>Bienvenue sur TodoApp</h1>
      <p>Organise tes tâches simplement.</p>
      <Link to="/login">Se connecter</Link>
      <Link to="/register">Créer un compte</Link>
    </div>
  );
}
