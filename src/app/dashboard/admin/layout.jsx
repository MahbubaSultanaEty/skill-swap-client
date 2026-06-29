import { requiredRole } from '@/lib/core/session'


export default async function AdminDashboardLayout({children}) {
     await requiredRole("admin")
  return (
      children
  )
}
