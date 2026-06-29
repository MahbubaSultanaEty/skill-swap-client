import { requiredRole } from "@/lib/core/session"


export default async function FreelancerDashboardLayout({ children }) {
    await requiredRole("freelancer")
  return (
    children
  )
}
