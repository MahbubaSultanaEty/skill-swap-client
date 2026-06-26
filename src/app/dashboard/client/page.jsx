import { getUserSession } from '@/lib/core/session'
import React from 'react'

const ClientDashboardHomepage =async () => {
    const user = await getUserSession()
  return (
    <div>ClientDashboardHomepage</div>
  )
}

export default ClientDashboardHomepage
