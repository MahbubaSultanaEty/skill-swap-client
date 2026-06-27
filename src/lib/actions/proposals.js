'use server'
import { serverMutation } from "../core/server"

export const submitProposal = async (proposalData) => {
    return serverMutation('/api/proposals', proposalData);
}