import { protectedFetch } from "../core/server";

export const getPayments = async (queryString = "") => {
  return protectedFetch(`/api/payments${queryString ? `?${queryString}` : ""}`);
};