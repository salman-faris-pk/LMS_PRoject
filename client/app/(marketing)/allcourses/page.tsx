import TopSection from '@/components/TopSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <TopSection title="All Courses"
         breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Courses" },
        ]}
        highlight='Courses'
      />
        
        All courses page</div>
  )
}

export default page