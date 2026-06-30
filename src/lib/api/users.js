import { protectedFetch } from "../core/server";


export const getUsers = async (queryString = "") => {
  return protectedFetch(`/api/users${queryString ? `?${queryString}` : ""}`);
};