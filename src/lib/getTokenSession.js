"use server"
import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenServer = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  // console.log(token);
  return token || null;
};