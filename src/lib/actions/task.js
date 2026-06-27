"use server"

import { serverMutaion } from "../core/server"

export const createTask = async (newTaskData) => {
     return await serverMutaion(`/api/tasks`, newTaskData);
   
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createTask = async (newTaskData) => {
//     const res = await fetch(`${baseUrl}/api/tasks`, {
//         method: "POST",
//         headers: {
//             "content-type": 'application/json'
//         },
//         body: JSON.stringify(newTaskData)
//     })
//     return res.json()
// }