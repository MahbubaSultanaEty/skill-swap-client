import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation';
import React from 'react'

const DashBoardLayout = async({ children }) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/login")
  }
  return (
      <div className='flex min-h-screen'>
          <DashboardSidebar user={ user} />
          <div className='flex-1 lg:ml-64 ml-14'>{children}</div>
    </div>
  )
}

export default DashBoardLayout