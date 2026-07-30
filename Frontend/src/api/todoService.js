import apiClient from "./apiClient";

export const createTask = async (taskData) => {
  const response = await apiClient.post("/task/create", taskData);
  return response.data;
};

export const getAllTasks = async () => {
  const response = await apiClient.get("/task/get");
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await apiClient.get(`/task/get/${id}`);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await apiClient.put(`/task/update/${id}`, taskData);
  return response.data;
};

export const deleteData = async (id) => {
  const response = await apiClient.delete(`/task/delete/${id}`);
  return response.data;
};
