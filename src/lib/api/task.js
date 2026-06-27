import { serverFetch } from "../core/server";

export const getTasks = async (queryString) => {
    return serverFetch(`/api/tasks?${queryString}`)
}

export const getClientTasks = async (clientId) => {
    return serverFetch(`/api/tasks/${clientId}`)
}
// export const getClientTasks = async (clientId) => {
    
//     const res = await fetch(`${baseUrl}/api/tasks/${clientId}`);
   
// }



