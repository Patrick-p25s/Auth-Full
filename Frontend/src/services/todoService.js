import apiClient from "./apiClient";

export const getAllTasks = async () => {
  const response = await apiClient.get("/task/get");
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await apiClient.get(`/task/get/${id}`);
  return response.data;
};

// create_task attend tache + category en QUERY PARAMS, pas en JSON body
export const createTask = async ({ tache, category }) => {
  const response = await apiClient.post("/task/create", null, {
    params: { tache, category },
  });
  return response.data;
};

// update_task attend un JSON body classique
export const updateTask = async (id, { tache, category }) => {
  const response = await apiClient.put(`/task/update/${id}`, {
    tache,
    category,
  });
  return response.data;
};

export const deleteTask = async (id) => {
  await apiClient.delete(`/task/delete/${id}`);
};

export const finishTask = async (id) => {
  const response = await apiClient.patch(`/task/finish/${id}`);
  return response.data;
};
