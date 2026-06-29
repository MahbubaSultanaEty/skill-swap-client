import { protectedFetch, serverFetch } from "../core/server"

export const getProposalsByClientId = async (clientId) => {
    return protectedFetch(`/api/proposals?clientId=${clientId}`)
}

export const getProposalsByFreelancerEmail = async (freelancerEmail) => {
    return serverFetch(`/api/proposals?freelancerEmail=${freelancerEmail}`)
}

