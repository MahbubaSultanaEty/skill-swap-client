"use server"

import { serverMutation } from "../core/server";

export const updateUserBlockStatus = async (id, isBlocked) => {
  return await serverMutation(
    `/api/users/${id}/block`,
    { isBlocked },
    "PATCH"
  );
};