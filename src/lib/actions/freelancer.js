"use server"

import { serverFetch } from "../core/server";

export const getFreelancers = async () => {
  return serverFetch("/api/freelancers");
};

export const getUserByEmail= async(email)=>  {   
  const data = await serverFetch(`/api/users/email/${email}`); 
  return data ;
}