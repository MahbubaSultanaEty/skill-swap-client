import { serverFetch } from "../core/server"

export const getPlanId = async (planId) => {
    return serverFetch(`/api/plans?plan_id=${planId}`)
}