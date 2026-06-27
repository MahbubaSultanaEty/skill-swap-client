import { serverFetch } from "../core/server"

export const getProposalsByClientId = async (clientId) => {
    return serverFetch(`/api/proposals?clientId=${clientId}`)
}

export const getProposalsByFreelancerEmail = async (freelancerEmail) => {
    return serverFetch(`/api/proposals?freelancerEmail=${freelancerEmail}`)
}