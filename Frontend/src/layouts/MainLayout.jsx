import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

export function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div>
      <nav>
        <Link to="/">Accueil</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span>Bonjour {user?.name}</span>
            <button onClick={logout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
