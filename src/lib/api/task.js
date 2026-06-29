import { serverFetch } from "../core/server";

export const getTasks = async (queryString = "") => {
  return serverFetch(`/api/tasks${queryString ? `?${queryString}` : ""}`);
};
export const getTaskById = async (id) => {
  const data = await serverFetch(`/api/tasks/currentTask/${id}`);
  return data;
};


export const getClientTasks = async (clientId) => {
    return serverFetch(`/api/tasks/${clientId}`)
}




