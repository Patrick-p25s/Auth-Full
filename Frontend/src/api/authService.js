import apiClient from "./apiClient";

export const login = async (email, password) => {
  const urlParams = new URLSearchParams();
  urlParams.append("username", email);
  urlParams.append("password", password);

  const response = await apiClient.post("/user/login", urlParams, {
    headers: { Accept: "application/x-www-form-urlencoded" },
  });

  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post("/user/register", userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get("/user/me");
  return response.data;
};
