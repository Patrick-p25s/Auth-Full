import { createContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  login as loginApi,
  register as registerApi,
} from "../api/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("TOKEN");
      if (token) {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch {
          localStorage.removeItem("TOKEN");
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    localStorage.setItem("TOKEN", data.access_token);

    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const register = async (userData) => {
    await registerApi(userData);
    await login(userData.email, userData.password);
  };

  const logout = () => {
    localStorage.removeItem("TOKEN");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    register,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
