import apiClient from "./apiClient";

// FastAPI avec OAuth2PasswordRequestForm attend du x-www-form-urlencoded
// Adapte les champs (username/email) selon ton endpoint exact
export const login = async (email, password) => {
  const params = new URLSearchParams();
  params.append("username", email); // FastAPI OAuth2 utilise "username" même pour un email
  params.append("password", password);

  const response = await apiClient.post("/user/login", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data; // { access_token, token_type }
};

export const register = async (userData) => {
  const response = await apiClient.post("/user/register", userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get("/user/me");
  return response.data;
};
