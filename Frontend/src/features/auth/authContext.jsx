import { createContext, useState, useEffect } from "react";
import {
  login as loginApi,
  register as registerApi,
  getCurrentUser,
} from "../../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // évite un flash "non connecté" au démarrage

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch {
          localStorage.removeItem("token"); // token invalide/expiré
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    localStorage.setItem("token", data.access_token);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const register = async (userData) => {
    await registerApi(userData);
    // optionnel : connecter automatiquement après inscription
    await login(userData.email, userData.password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
