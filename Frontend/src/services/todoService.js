import apiClient from "./apiClient";

export const getAllTasks = async () => {
  const response = await apiClient.get("/task/get");
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await apiClient.get(`/task/get/${id}`);
  return response.data;
};

export const createTask = async (data) => {
  const response = await apiClient.post("/task/create", data);
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await apiClient.put(`/task/update/${id}`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  await apiClient.delete(`/task/delete/${id}`);
};

export const finishTask = async (id) => {
  const response = await apiClient.patch(`/task/finish/${id}`);
  return response.data;
};
