import Footer from '@/components/shared/Footer'
import React from 'react'

export default function TaskPageLAyout({children}) {
  return (
      <div>
          {children}
          <Footer/>
    </div>
  )
}
